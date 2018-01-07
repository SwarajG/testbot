const callSendAPI = require('./CallSendAPI');
const getStarted = require('./Response/GetStarted');

module.exports = (senderPsid, receivedMessage) => {
  let response;
  const receivedResponse = receivedMessage.text;
  if (receivedResponse) {
    response = {
      text: 'hello',
      // getStarted,
    };
  }
  callSendAPI(senderPsid, response);
};
