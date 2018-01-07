const callSendAPI = require('./CallSendAPI');
const getStarted = require('./Response/GetStarted');
module.exports = (sender_psid, received_message) => {
  let response;
  const receivedResponse = received_message.text;
  if (receivedResponse) {
    if (receivedResponse.toLowerCase() === 'get started') {
      response = {
        
      }
    }
  }
  callSendAPI(sender_psid, response);
};