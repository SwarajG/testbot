const { handleMessage } = require('./HandleMessage');
const callSendApi = require('./CallSendAPI');
const { handlePostback, getResponseForReply } = require('./HandlePostback');

module.exports = {
  handleMessage,
  callSendApi,
  handlePostback,
  getResponseForReply,
};
