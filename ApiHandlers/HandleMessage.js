const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');

module.exports = (senderPsid, receivedMessage) => {
  let response;
  const receivedResponse = receivedMessage.text;
  console.log();
  if (receivedResponse) {
    if (receivedMessage.quick_reply.payload) {
      const splitesMessage = receivedResponse.split('_');
      if (splitesMessage[0] === 'quantity') {
        orderController.handleOrderState(senderPsid, receivedResponse, (err) => {
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
