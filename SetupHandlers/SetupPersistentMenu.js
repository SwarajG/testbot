const request = require('request');

const { PAGE_ACCESS_TOKEN } = process.env;

module.exports = (res) => {
  const messageData = {
    persistent_menu: [
      {
        locale: 'default',
        composer_input_disabled: true,
        call_to_actions: [
          {
            title: 'Info',
            type: 'nested',
            call_to_actions: [
              {
                title: 'Help',
                type: 'postback',
                payload: 'HELP_PAYLOAD',
              },
              {
                title: 'Contact Me',
                type: 'postback',
                payload: 'CONTACT_INFO_PAYLOAD',
              },
            ],
          },
          {
            type: 'web_url',
            title: 'Visit website ',
            url: 'http://www.techiediaries.com',
            webview_height_ratio: 'full',
          },
        ],
      },
      {
        locale: 'zh_CN',
        composer_input_disabled: false,
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
