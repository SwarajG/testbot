const rp = require('request-promise');

const { PAGE_ACCESS_TOKEN } = process.env;

const getCallSendPromise = (senderPsid, message) => {
  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    message,
  };
  return rp({
    uri: 'https://graph.facebook.com/v2.10/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: requestBody,
  });
};

module.exports = getCallSendPromise;
