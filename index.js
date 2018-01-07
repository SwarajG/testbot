'use strict';

require('dotenv').config();
const
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    ApiHandlers = require('./ApiHandlers'),
    app = express().use(bodyParser.json());
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.post('/webhook', (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
        ApiHandlers.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        ApiHandlers.handlePostback(sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// app.post('/webhook', function (req, res) {
//   var data = req.body;
//   // Make sure this is a page subscription
//   if (data.object == 'page') {
//     // Iterate over each entry
//     data.entry.forEach(function (pageEntry) {
//       //Newsfeed changes webhook request
//       if (pageEntry.hasOwnProperty('changes')) {
//         pageEntry.changes.forEach(function (changes) {
//           console.log(changes);
//           if (changes.field == "feed" && changes.value.item == "comment" && changes.value.verb == "add") {
//             var messageData = {
//               message: "hello"
//             };
//             callPrivateReply(messageData, changes.value.comment_id);
//           }
//         });
//       }
//       //Messenger webhook request
//       if (pageEntry.hasOwnProperty('messaging')) {
//         //messenger code goes here
//       }
//     });
//     // Assume all went well.
//     //
//     // You must send back a 200, within 20 seconds, to let us know you've 
//     // successfully received the callback. Otherwise, the request will time out.
//     res.sendStatus(200);
//   }
// });

// function callPrivateReply(messageData, comment_id) {
//   request({
//     uri: 'https://graph.facebook.com/v2.9/' + comment_id + '/private_replies',
//     qs: { access_token: PAGE_ACCESS_TOKEN },
//     method: 'POST',
//     json: messageData
//   }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body);
//     } else {
//       console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
//     }
//   });
// }

app.get('/webhook', (req, res) => {

  const VERIFY_TOKEN = "upandup"
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));