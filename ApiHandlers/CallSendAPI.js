const request = require('request');

const { PAGE_ACCESS_TOKEN } = process.env;

module.exports = (senderPsid, message) => {
  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    message,
  };

  request({
    uri: 'https://graph.facebook.com/v2.10/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: requestBody,
  }, (err, res, body) => {
    console.log(body);
    if (!err) {
      console.log('message sent!');
    } else {
      console.error("Unable to send message:" + err);
    }
  });
};
