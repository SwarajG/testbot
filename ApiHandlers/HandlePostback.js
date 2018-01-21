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
const asyncCallSend = require('./AsyncCallSendApi');
const Order = require('../model/order');

const addItemQuickReplies = itemId => (
  [...Array(5).keys()].map(value => ({
    content_type: 'text',
    title: value + 1,
    payload: `quantity_${itemId}_${value + 1}`,
  }))
);

const showCurrentOrderCart = (userId) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    const order = orderList[0];
    const response = {
      attachment: {
        type: 'generic',
        elements: order.itemList.map((item) => {
          const itemImage = helper.getItemById(item.itemId).image;
          const {
            itemId,
            name,
            price,
            quantity,
          } = item;
          return {
            title: name,
            subtitle: `Price: ${price}Rs, Quantity: ${quantity}`,
            image_url: itemImage,
            buttons: [{
              type: 'postback',
              title: 'Place Order',
              payload: 'place-order',
            }, {
              type: 'postback',
              title: 'Change Quantity',
              payload: `${enums.CHANGE_QUANTITY}_${itemId}`,
            }, {
              type: 'postback',
              title: 'Remove from cart',
              payload: `${enums.DELETE_ITEM}`,
            }, {
              type: 'postback',
              title: 'Back to menu',
              payload: 'show-menu',
            }],
          };
        }),
      },
    };
    callSendAPI(userId, response);
  });
};

const prepareNextAction = (senderPsid, action, itemName, itemId) => {
  const response = { text: '', quick_replies: [] };
  switch (action) {
    case enums.ADD_ITEM:
      response.text = `How many ${itemName} do you need?`;
      response.quick_replies = addItemQuickReplies(itemId);
      break;
    default:
      break;
  }
  return response;
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
      const newResponse = prepareNextAction(senderPsid, action, itemName, itemId);
      asyncCallSend(senderPsid, choiceResponse)
        .then(() => asyncCallSend(senderPsid, newResponse))
        .catch(error => console.log(error));
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
      case 'show-cart':
        return showCurrentOrderCart(senderPsid);
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
      callSendAPI(senderPsid, response);
    }
  },
  getResponseForReply,
};
