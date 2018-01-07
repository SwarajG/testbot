module.exports = (sender_psid, message) => {
  const request_body = {
    recipient: {
      id: sender_psid
    },
    message
  }
  request({
    uri: 'https://graph.facebook.com/v2.10/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN
    },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
};