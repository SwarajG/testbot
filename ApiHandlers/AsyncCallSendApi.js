const fetch = require('node-fetch');

const { PAGE_ACCESS_TOKEN } = process.env;

const getCallSendPromise = (senderPsid, message) => {
  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    message,
  };
  return fetch(`https://graph.facebook.com/v2.10/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
};

module.exports = getCallSendPromise;
