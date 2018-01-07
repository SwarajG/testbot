const callSendAPI = require('./CallSendAPI');
const GET_STARTED_RESPONSE = require('./Response/GetStarted');

module.exports = (senderPsid, receivedPostback) => {
  const { payload } = receivedPostback.payload;
  if (payload === 'GET_STARTED_PAYLOAD') {
    callSendAPI(GET_STARTED_RESPONSE);
    console.log('Send some starting stuff...');
  }
  console.log('Postback: ', senderPsid, receivedPostback);
};
