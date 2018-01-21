const fetch = require('node-fetch');
const url = require('url');

const { URLSearchParams } = url;
const params = new URLSearchParams();

const { PAGE_ACCESS_TOKEN } = process.env;

const getCallSendPromise = (senderPsid, message) => {
  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    message,
  };
  params.append('access_token', PAGE_ACCESS_TOKEN);
  return fetch('https://graph.facebook.com/v2.10/me/messages', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
};

module.exports = getCallSendPromise;
