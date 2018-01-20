const callSendAPI = require('./CallSendAPI');
const orderController = require('../controller/order');

module.exports = (senderPsid, receivedMessage) => {
  let response;
  const receivedResponse = receivedMessage.text;
  console.log(receivedMessage);
  const splitesMessage = receivedResponse.split('_');
  if (receivedResponse) {
    if (splitesMessage[0] === 'quantity') {
      orderController.handleOrderState(senderPsid, receivedResponse, (err) => {
        if (err) {
          console.log('Sorry, not able to update to cart...', err);
        }
        console.log('Successfully updated to the cart...');
      });
    }
    response = {
      text: 'hello',
    };
  }
  callSendAPI(senderPsid, response);
};
