const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');
const helper = require('../utils/helper');
const continueOrder = require('./Response/ContinueOrder');
const asyncCallSend = require('../ApiHandlers/AsyncCallSendApi');

module.exports = (senderPsid, receivedMessage) => {
  let response;
  console.log('receivedMessage: ', receivedMessage);
  if (receivedMessage.quick_reply) {
    const quickReply = receivedMessage.quick_reply;
    if (quickReply.payload) {
      const { payload } = quickReply;
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
    // else {
    //   response = {
    //     text: 'hello',
    //   };
    // }
  }
  callSendAPI(senderPsid, response);
};
