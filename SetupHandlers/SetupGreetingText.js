const request = require('request');

const { PAGE_ACCESS_TOKEN } = process.env;

module.exports = (res) => {
  const messageData = {
    greeting: [
      {
        locale: 'default',
        text: 'Greeting text for default local !',
      }, {
        locale: 'en_US',
        text: 'Greeting text for en_US local !',
      },
    ],
  };

  request(
    {
      url: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      form: messageData,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.send(body);
      }
    },
  );
};
