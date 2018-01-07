const callSendAPI = require('./CallSendAPI');
const GET_STARTED_RESPONSE = require('./Response/GetStarted');
const GET_MENU_RESPONSE = require('./Response/GetMenu');

const getResponseForReply = (payload) => {
  switch (payload) {
    case 'getstarted':
      return GET_STARTED_RESPONSE;
    case 'show_menu':
      return GET_MENU_RESPONSE;
    // case '':
    //   return;
    // case '':
    //   return;
    default:
      return {
        message: {
          text: 'Soory, not able to catch your response, please try from the given options',
        },
      };
  }
};

module.exports = (senderPsid, receivedPostback) => {
  const { payload } = receivedPostback;
  const response = getResponseForReply(payload);
  callSendAPI(senderPsid, response);
  console.log('Postback: ', senderPsid, receivedPostback);
};
