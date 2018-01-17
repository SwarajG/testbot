const callSendAPI = require('./CallSendAPI');
const GET_STARTED_RESPONSE = require('./Response/GetStarted');
const GET_MENU_RESPONSE = require('./Response/Menu');
const SHOW_COMBOS_RESPONSE = require('./Response/Combos');
const SHOW_BIRYANI_REPONSE = require('./Response/Biryani');
const SHOW_ROLLES_RESPONSE = require('./Response/Rolls');
const SHOW_DESSERT_RESPONSE = require('./Response/Desserts');
const SHOW_BEVERAGE_REPOSEN = require('./Response/Beverages');
const orderController = require('../controller/order');
const helper = require('../utils/helper');
const itemList = require('../utils/itemList');
const enums = require('../utils/enum');

const addItemQuickReplies = () => (
  [...Array(5).keys()].map(value => ({
    content_type: 'text',
    title: value + 1,
    payload: `itemId_${value + 1}`,
  }))
);

const prepareNextAction = (senderPsid, action, itemName, itemId) => {
  const response = { message: { text: '', quick_replies: [] } };
  switch (action) {
    case enums.ADD_ITEM:
      response.message.text = `How many ${itemName} do you need?`;
      response.message.quick_replies = addItemQuickReplies(itemId);
      break;
    default:
      break;
  }
  console.log(response);
  callSendAPI(senderPsid, response);
};

const getResponseTextForUser = (senderPsid, payload) => {
  const argumentsForOrder = payload.split('_');
  const action = argumentsForOrder[0];
  const itemId = argumentsForOrder.slice(1, argumentsForOrder.length)[0];
  const itemName = helper.getItemById(itemId);
  let messageText = '';
  switch (action) {
    case enums.ADD_ITEM:
      messageText = `Great! ${itemName} has been added to your cart!`;
      break;
    default:
      break;
  }
  setTimeout(() => {
    prepareNextAction(senderPsid, action, itemName, itemId);
  }, 300);
  return messageText;
};

const getResponseForReply = (payload, senderPsid) => {
  const allItems = [];
  Object.values(itemList).forEach(itemInfoList => allItems.push(itemInfoList));
  const itemValueList = allItems
    .reduce((prevItem, currItem) => prevItem.concat(currItem), [])
    .map(item => item.value)
    .filter(itemValue => !!itemValue);
  const value = payload.split('_')[1];
  if (itemValueList.indexOf(value) > -1) {
    orderController.handleOrderState(senderPsid, payload, (err, response) => {
      if (err) {
        console.log('Sorry, not able to update to cart...', err);
        return false;
      }
      console.log('Successfully updated to the cart...', response);
      const responseTextForUser = getResponseTextForUser(senderPsid, payload);
      return {
        message: {
          text: responseTextForUser,
        },
      };
    });
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
