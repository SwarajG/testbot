require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ApiHandlers = require('./ApiHandlers');
const config = require('./config');
// const SetupHandlers = require('./SetupHandlers');

const app = express().use(bodyParser.json());

// app.get('/setup', (req, res) => {
//   SetupHandlers.setupGetStartedButton(res);
//   SetupHandlers.setupGreetingText(res);
// });

app.post('/webhook', (req, res) => {
  const { body } = req;
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      if (entry.messaging) {
        const webhookEvent = entry.messaging[0];
        const senderPsid = webhookEvent.sender.id;
        if (webhookEvent.message) {
          ApiHandlers.handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          ApiHandlers.handlePostback(senderPsid, webhookEvent.postback);
        }
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'upandup';
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

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
});
