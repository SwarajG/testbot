const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');

module.exports = (senderPsid, receivedMessage) => {
  let response;
  console.log(receivedMessage);
  if (receivedMessage.quick_reply) {
    console.log('reply', receivedMessage.quick_reply);
    const quickReply = receivedMessage.quick_reply;
    if (quickReply.payload) {
      console.log('payload: ', quickReply.payload);
      const paylod = quickReply.payload;
      const splitesMessage = paylod.split('_');
      if (splitesMessage[0] === 'quantity') {
        orderController.handleOrderState(senderPsid, quickReply, (err) => {
          if (err) {
            console.log('Sorry, not able to update to cart...', err);
          }
          console.log('Successfully updated to the cart...');
        });
      }
    } else {
      response = {
        text: 'hello',
      };
    }
  }
  callSendAPI(senderPsid, response);
};
