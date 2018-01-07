module.exports = (senderPsid, receivedPostback) => {
  const { payload } = receivedPostback.payload;
  if (payload === 'GET_STARTED_PAYLOAD') {
    console.log('Send some starting stuff...');
  }
  console.log('Postback: ', senderPsid, receivedPostback);
};
