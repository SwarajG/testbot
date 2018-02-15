const sendEmailToaAdmin = require('../email');
const fetch = require('node-fetch');

module.exports = async (userId, order) => {
  const { PAGE_ACCESS_TOKEN } = process.env;
  try {
    const fbUserResponse = await fetch(`https://graph.facebook.com/v2.6/${senderPsid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`);
    const userJsonResponse = await fbUserResponse.json();
    sendEmailToaAdmin(order, userJsonResponse);
  } catch (error) {
    console.log(error);
  }
};
