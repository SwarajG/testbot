const priceList = require('./Price');
const Order = require('../../model/order');
const callSendAPI = require('../CallSendAPI');

const menuList = priceList.menu.map((category) => {
  const { name, imageUrl, button } = category;
  const { title, payload } = button;
  return {
    title: name,
    image_url: imageUrl,
    buttons: [{
      title,
      payload,
      type: 'postback',
    }],
  };
});

module.exports = (userId) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Sorry, not able to get the order...');
      const newResponse = menuList.map((menuItem) => {
        menuItem.buttons.push({
          title: 'Place order',
          payload: 'place-order',
          type: 'postback',
        });
        return menuItem;
      });
      callSendAPI(userId, newResponse);
    } else if (orderList.length > 0) {
      callSendAPI(userId, menuList);
    }
  });
};

module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: menuList,
    },
  },
};
