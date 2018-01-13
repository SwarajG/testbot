const callSendAPI = require('./CallSendAPI');
const GET_STARTED_RESPONSE = require('./Response/GetStarted');
const GET_MENU_RESPONSE = require('./Response/Menu');
const SHOW_COMBOS_RESPONSE = require('./Response/Combos');
const SHOW_BIRYANI_REPONSE = require('./Response/Biryani');
const SHOW_ROLLES_RESPONSE = require('./Response/Rolls');
const SHOW_DESSERT_RESPONSE = require('./Response/Desserts');
const SHOW_BEVERAGE_REPOSEN = require('./Response/Beverages');
const orderController = require('../controller/order');
const itemList = require('../utils/itemList');

const getResponseForReply = (payload, senderPsid) => {
  const allItems = [];
  Object.values(itemList).forEach(itemInfoList => allItems.push(itemInfoList));
  const itemValueList = allItems.map(item => item.value);
  console.log('itemValueList, payload', itemValueList, payload);
  if (itemValueList.indexOf(payload) > -1) {
    orderController.handleOrderState(senderPsid, payload, (err, response) => {
      if (err) {
        console.log('Sorry, not able to update to cart...', err);
      } else {
        console.log('Successfully updated to the cart...', response);
      }
    });
    return false;
  }
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
  const response = getResponseForReply(payload, senderPsid);
  callSendAPI(senderPsid, response);
};
