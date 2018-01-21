const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');
const helper = require('../utils/helper');
const continueOrder = require('./Response/ContinueOrder');
const asyncCallSend = require('../ApiHandlers/AsyncCallSendApi');
const { getResponseForReply } = require('./HandlePostback');
const enums = require('../utils/enum');
const Order = require('../model/order');

const showCurrentOrderCart = (userId) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    const order = orderList[0];
    const response = {
      attachment: {
        type: 'template',
        template_type: 'generic',
        elements: order.itemList.map((item) => {
          const itemImage = helper.getItemById(item.itemId).image;
          const {
            itemId,
            name,
            price,
            quantity,
          } = item;
          return {
            title: name,
            subtitle: `Price: ${price}Rs, Quantity: ${quantity}`,
            image_url: itemImage,
            buttons: [{
              type: 'postback',
              title: 'Place Order',
              payload: 'place-order',
            }, {
              type: 'postback',
              title: 'Change Quantity',
              payload: `${enums.CHANGE_QUANTITY}_${itemId}`,
            }, {
              type: 'postback',
              title: 'Remove from cart',
              payload: `${enums.DELETE_ITEM}`,
            }, {
              type: 'postback',
              title: 'Back to menu',
              payload: 'show-menu',
            }],
          };
        }),
      },
    };
    callSendAPI(userId, response);
  });
};

module.exports = (senderPsid, receivedMessage) => {
  let response;
  if (receivedMessage.quick_reply) {
    const quickReply = receivedMessage.quick_reply;
    const { payload } = quickReply;
    if (payload) {
      console.log(payload);
      if (payload === 'show-menu') {
        const newResponse = getResponseForReply(payload, senderPsid);
        if (newResponse) {
          callSendAPI(senderPsid, newResponse);
        }
      } else if (payload === 'show-cart') {
        showCurrentOrderCart(senderPsid);
      } else {
        const splitesMessage = payload.split('_');
        const [action, itemId, quantity] = splitesMessage;
        if (action === 'quantity') {
          orderController.handleOrderState(senderPsid, payload, (err) => {
            if (err) {
              console.log('Sorry, not able to update the quantity...', err);
            }
            console.log('Successfully updated to the quantity...');
            const itemName = helper.getItemById(itemId).name;
            const choiceResponse = {
              text: `Quantity of ${itemName} has been updated to ${quantity}`,
            };
            asyncCallSend(senderPsid, choiceResponse)
              .then(() => asyncCallSend(senderPsid, continueOrder))
              .catch(error => console.log(error));
          });
        }
      }
    }
    // else {
    //   response = {
    //     text: 'hello',
    //   };
    // }
  }
  callSendAPI(senderPsid, response);
};
