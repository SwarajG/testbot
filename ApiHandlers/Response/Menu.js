const priceList = require('./Price');
const Order = require('../../model/order');
const callSendAPI = require('../CallSendAPI');
const _ = require('lodash');

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

const responseObject = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: {},
    },
  },
};

const getResponse = (response) => {
  const clonedResponse = _.cloneDeep(response);
  const clonedResponseObject = _.cloneDeep(responseObject);
  clonedResponseObject.attachment.payload.elements = clonedResponse;
  return clonedResponseObject;
};

module.exports = (userId) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Sorry, not able to get the order...');
    } else if (orderList.length === 0) {
      const clonedMenuList = _.cloneDeep(menuList);
      const response = getResponse(clonedMenuList);
      console.log('1', JSON.stringify(response));
      callSendAPI(userId, response);
    } else if (orderList.length > 0) {
      const clonedMenuList = _.cloneDeep(menuList);
      const newResponse = clonedMenuList.map((menuItem) => {
        menuItem.buttons.push({
          title: 'Place order',
          payload: 'place-order',
          type: 'postback',
        });
        return menuItem;
      });
      const response = getResponse(newResponse);
      console.log('2', JSON.stringify(response));
      callSendAPI(userId, response);
    }
  });
};
