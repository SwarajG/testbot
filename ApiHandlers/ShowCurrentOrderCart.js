const enums = require('../utils/enum');
const Order = require('../model/order');
const callSendAPI = require('./CallSendAPI');
const helper = require('../utils/helper');

const getElemets = order => order.itemList.map((item) => {
  const itemImage = helper.getItemById(item.itemId).image;
  const {
    itemId,
    name,
    price,
    quantity,
  } = item;
  return {
    title: name,
    subtitle: `Price: Rs. ${price}, Quantity: ${quantity}`,
    image_url: itemImage,
    buttons: [{
      type: 'postback',
      title: 'Place Order',
      payload: 'place-order',
    }, {
      type: 'postback',
      title: 'Remove from cart',
      payload: `${enums.DELETE_ITEM}_${itemId}`,
    }, {
      type: 'postback',
      title: 'Continue ordering',
      payload: 'show-menu',
    }],
  };
});

const showCurrentOrderCart = (userId) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Sorry, not able to get the order...');
    } else {
      const order = orderList[0];
      const response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: getElemets(order),
          },
        },
      };
      callSendAPI(userId, response);
    }
  });
};

module.exports = showCurrentOrderCart;
