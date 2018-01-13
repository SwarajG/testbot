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
  const itemValueList = allItems
    .reduce((prevItem, currItem) => prevItem.concat(currItem), [])
    .map(item => item.value)
    .filter(itemValue => !!itemValue);
  const value = payload.split('_')[1];
  console.log('value, payload', value, payload);
  if (itemValueList.indexOf(value) > -1) {
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
    case 'show-menu':
      return GET_MENU_RESPONSE;
    case 'show-combos':
      return SHOW_COMBOS_RESPONSE;
    case 'show-biryani':
      return SHOW_BIRYANI_REPONSE;
    case 'show-rolls':
      return SHOW_ROLLES_RESPONSE;
    case 'show-dessert':
      return SHOW_DESSERT_RESPONSE;
    case 'show-beverages':
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
