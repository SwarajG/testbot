const callSendAPI = require('./CallSendAPI');
const GET_STARTED_RESPONSE = require('./Response/GetStarted');
const GET_MENU_RESPONSE = require('./Response/Menu/GetMenu');
const SHOW_COMBOS_RESPONSE = require('./Response/Combos/GetCombos');
const SHOW_BIRYANI_REPONSE = require('./Response/Biryani/GetBiryani');
const SHOW_ROLLES_RESPONSE = require('./Response/Rolls/GetRolles');
const SHOW_DESSERT_RESPONSE = require('./Response/Desserts/GetDesserts');
const SHOW_BEVERAGE_REPOSEN = require('./Response/Beverages/GetBeverages');

const getResponseForReply = (payload) => {
  switch (payload) {
    case 'getstarted':
      return GET_STARTED_RESPONSE;
    case 'show_menu':
      return GET_MENU_RESPONSE;
    case 'show_combos':
      return SHOW_COMBOS_RESPONSE;
    case 'show_biryani':
      return SHOW_BIRYANI_REPONSE;
    case 'show_rolls':
      return SHOW_ROLLES_RESPONSE;
    case 'show_dessert':
      return SHOW_DESSERT_RESPONSE;
    case 'show_beverages':
      return SHOW_BEVERAGE_REPOSEN;
    default:
      return {
        message: {
          text: 'Sorry, not able to catch your response, please try from the given options',
        },
      };
  }
};

module.exports = (senderPsid, receivedPostback) => {
  const { payload } = receivedPostback;
  const response = getResponseForReply(payload);
  callSendAPI(senderPsid, response);
};
