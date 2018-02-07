const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');
const helper = require('../utils/helper');
const continueOrder = require('./Response/ContinueOrder');
const asyncCallSend = require('../ApiHandlers/AsyncCallSendApi');
const { getResponseForReply } = require('./HandlePostback');
const showCurrentOrderCart = require('./ShowCurrentOrderCart');
const addPhoneNumberForOrder = require('../controller/order/AddPhoneNumberForOrder');
const enums = require('../utils/enum');

module.exports = {
  handleMessage: (senderPsid, receivedMessage) => {
    let response;
    if (receivedMessage.quick_reply) {
      const quickReply = receivedMessage.quick_reply;
      const { payload } = quickReply;
      if (payload) {
        if (payload === 'show-menu') {
          const newResponse = getResponseForReply(payload, senderPsid);
          if (newResponse) {
            callSendAPI(senderPsid, newResponse);
          }
        } else if (payload === 'show-cart') {
          showCurrentOrderCart(senderPsid);
        } else if (payload === 'place-order') {
          const newResponse = getResponseForReply(payload, senderPsid);
          if (newResponse) {
            callSendAPI(senderPsid, newResponse);
          }
        } else if (payload === 'order-pickup') {
          console.log('order-pickup from message');
          const newResponse = getResponseForReply(payload, senderPsid);
          if (newResponse) {
            callSendAPI(senderPsid, newResponse);
          }
        } else if (payload.indexOf(enums.PICKUP) > -1) {
          const splitesMessage = payload.split('_');
          const [action] = splitesMessage;
          if (action === enums.PICKUP) {
            orderController.handleOrderState(senderPsid, payload, (err) => {
              if (err) {
                console.log('Sorry, not able to update the pickup location...', err);
              }
              console.log('Successfully updated to the pickup location...');
              const choiceResponse = {
                text: 'Please enter your phone, without it order will not be considered as a valid order.',
              };
              asyncCallSend(senderPsid, choiceResponse)
                .then(() => asyncCallSend(senderPsid, continueOrder))
                .catch(error => console.log(error));
            });
          }
        } else if (payload.indexOf(enums.QUANTITY) > -1) {
          const splitesMessage = payload.split('_');
          const [action, itemId, quantity] = splitesMessage;
          if (action === enums.QUANTITY) {
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
    } else if (receivedMessage.text && receivedMessage.text.length === 10) {
      const userText = receivedMessage.text;
      const phoneNumber = parseInt(userText, 10);
      if (phoneNumber.toString().length === 10) {
        addPhoneNumberForOrder(senderPsid, phoneNumber);
        const choiceResponse = {
          text: 'Your order has been placed, for any query please contact +91 9426478112.',
        };
        callSendAPI(senderPsid, choiceResponse);
      } else {
        const choiceResponse = {
          text: 'Please enter valid value',
        };
        callSendAPI(senderPsid, choiceResponse);
      }
    }
    callSendAPI(senderPsid, response);
  },
  showCurrentOrderCart,
};
