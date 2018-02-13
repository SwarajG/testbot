const callSendAPI = require('../../ApiHandlers/CallSendAPI');
const enums = require('../../utils/enum');
const addItemToCart = require('./AddItemToCart');
const deleteItemFromCart = require('./DeleteItemFromCart');
const addQuantityForItem = require('./AddQuantityForItem');
const placeOrderForUser = require('./PlaceOrderForUser');
const addAddressForOrder = require('./AddAddressForOrder');
const changeQuantityForItem = require('../../ApiHandlers/ChangeQuantityForItem');
const setPickupLocationForOrder = require('./PickupLocationForOrder');
const updateOrderStatus = require('../order/UpdateOrderStatus');

const handleOrderStatus = (userId, payload, cb) => {
  const argumentsForOrder = payload.split('_');
  const action = argumentsForOrder[0];
  const valueOfItem = argumentsForOrder.slice(1, argumentsForOrder.length)[0];
  switch (action) {
    case enums.ADD_ITEM:
      addItemToCart(userId, valueOfItem, cb);
      break;
    case enums.QUANTITY: {
      const splitPayload = payload.split('_');
      const [
        itemId,
        quantity,
      ] = splitPayload.slice(1, splitPayload.length);
      addQuantityForItem(userId, itemId, quantity, cb);
      break;
    }
    case enums.DELETE_ITEM:
      deleteItemFromCart(userId, valueOfItem, cb);
      break;
    case enums.CHANGE_QUANTITY: {
      const response = changeQuantityForItem(valueOfItem);
      callSendAPI(userId, response);
      break;
    }
    case enums.ADD_ADDRESS:
      addAddressForOrder(userId, valueOfItem, cb);
      break;
    case enums.PLACE_ORDER:
      placeOrderForUser(userId, cb);
      break;
    case enums.PICKUP:
      setPickupLocationForOrder(userId, valueOfItem, cb);
      break;
    case enums.ORDER_STATUS.CANCELED:
      updateOrderStatus(userId, enums.ORDER_STATUS.CANCELED, cb);
      break;
    default:
      break;
  }
};

module.exports = handleOrderStatus;
