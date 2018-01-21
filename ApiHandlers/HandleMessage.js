const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');

module.exports = (senderPsid, receivedMessage) => {
  let response;
  console.log(receivedMessage);
  if (receivedMessage.quick_reply) {
    const quickReply = receivedMessage.quick_reply;
    if (quickReply.payload) {
      const { payload } = quickReply;
      const splitesMessage = payload.split('_');
      if (splitesMessage[0] === 'quantity') {
        orderController.handleOrderState(senderPsid, payload, (err) => {
          if (err) {
            console.log('Sorry, not able to update to cart...', err);
          }
          console.log('Successfully updated to the cart..');
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
