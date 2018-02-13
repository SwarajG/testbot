const callSendAPI = require('./CallSendAPI');
const GET_STARTED_RESPONSE = require('./Response/GetStarted');
const GET_MENU_RESPONSE = require('./Response/Menu');
const SHOW_COMBOS_RESPONSE = require('./Response/Combos');
const SHOW_BIRYANI_REPONSE = require('./Response/Biryani');
const SHOW_ROLLES_RESPONSE = require('./Response/Rolls');
const SHOW_DESSERT_RESPONSE = require('./Response/Desserts');
const SHOW_BEVERAGE_REPOSEN = require('./Response/Beverages');
const PLACE_ORDER = require('./Response/PlaceOrder');
const orderController = require('../controller/order');
const helper = require('../utils/helper');
const itemList = require('../utils/itemList');
const enums = require('../utils/enum');
const asyncCallSend = require('./AsyncCallSendApi');
const showCurrentOrderCart = require('./ShowCurrentOrderCart');
const changeQuantityForItem = require('./ChangeQuantityForItem');
const OUTLETS = require('./Response/Outlet');
const setMethodAsDeliver = require('../controller/order/DeliverMethodForOrder');

const prepareNextAction = (senderPsid, action, itemName, itemId) => {
  let response = {};
  let cb = null;
  switch (action) {
    case enums.ADD_ITEM:
      response = changeQuantityForItem(itemId);
      break;
    case enums.DELETE_ITEM: {
      response.text = 'Here is your cart';
      cb = showCurrentOrderCart;
      break;
    }
    default:
      break;
  }
  return {
    response,
    cb,
  };
};

const getResponseTextForUser = (senderPsid, payload) => {
  const argumentsForOrder = payload.split('_');
  const action = argumentsForOrder[0];
  const itemId = argumentsForOrder.slice(1, argumentsForOrder.length)[0];
  const itemName = helper.getItemById(itemId).name;
  let messageText = '';
  switch (action) {
    case enums.ADD_ITEM:
      messageText = `Great! ${itemName} has been added to your cart!`;
      break;
    case enums.DELETE_ITEM:
      messageText = `${itemName} successfully removed from your cart!`;
      break;
    default:
      break;
  }
  return {
    messageText,
    action,
    itemName,
    itemId,
  };
};

const getResponseForReply = (payload, senderPsid) => {
  const splitPayload = payload.split('_');
  const allItems = [];
  Object.values(itemList).forEach(itemInfoList => allItems.push(itemInfoList));
  const itemValueList = allItems
    .reduce((prevItem, currItem) => prevItem.concat(currItem), [])
    .map(item => item.value)
    .filter(itemValue => !!itemValue);
  const value = splitPayload[1];
  if (itemValueList.indexOf(value) > -1) {
    orderController.handleOrderState(senderPsid, payload, (err) => {
      if (err) {
        console.log('Sorry, not able to update to cart...', err);
      }
      console.log('Successfully updated to the cart...');
      if (payload.indexOf(enums.PICKUP) > -1) {
        const choiceResponse = {
          text: 'Please enter your phone, without it order will not be considered as a valid order.',
        };
        callSendAPI(senderPsid, choiceResponse);
      } else if (payload.indexOf(enums.ORDER_STATUS.CANCELED) > -1) {
        const cancelResponse = {
          text: 'Your order has been canceled.',
        };
        const forNextOrder = {
          text: 'Please just type in "menu" for the next order to start.',
        };
        asyncCallSend(senderPsid, cancelResponse)
          .then(() => asyncCallSend(senderPsid, forNextOrder))
          .catch(errFromCancel => console.log(errFromCancel));
      } else {
        const {
          messageText,
          action,
          itemName,
          itemId,
        } = getResponseTextForUser(senderPsid, payload);
        const responseTextForUser = messageText;
        const choiceResponse = {
          text: responseTextForUser,
        };
        const { response: newResponse, cb } = prepareNextAction(senderPsid, action, itemName, itemId);
        asyncCallSend(senderPsid, choiceResponse)
          .then(() => asyncCallSend(senderPsid, newResponse))
          .then(() => { if (cb) cb(senderPsid); })
          .catch(error => console.log(error));
      }
    });
  } else {
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
      case 'place-order':
        return PLACE_ORDER;
      case 'order-pickup':
        return OUTLETS;
      case 'order-delivery':
        setMethodAsDeliver(senderPsid, (err) => {
          if (err) console.log(err);
          console.log('Successfulyy added method as delivery to home.');
        });
        return {
          text: 'Please enter your phone number, without it order will not be considered as a valid order. We will confirm your address on this phone number',
        };
      default:
        return {
          text: 'Sorry, not able to catch your response, please try from the given options',
        };
    }
  }
};

module.exports = {
  handlePostback: (senderPsid, receivedPostback) => {
    const { payload } = receivedPostback;
    const response = getResponseForReply(payload, senderPsid);
    if (response) {
      if (payload === 'getstarted') {
        const cancelWarning = {
          text: 'You can cancel your order during the ordering process, after ordering if you want to cancel the order you can call us on +91 9081234508',
        };
        asyncCallSend(senderPsid, cancelWarning)
          .then(() => asyncCallSend(senderPsid, response))
          .catch(err => console.log(err));
      } else {
        callSendAPI(senderPsid, response);
      }
    }
  },
  getResponseForReply,
};
