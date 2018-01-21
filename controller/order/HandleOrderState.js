const enums = require('../../utils/enum');
const addItemToCart = require('./AddItemToCart');
const deleteItemFromCart = require('./DeleteItemFromCart');
const addQuantityForItem = require('./AddQuantityForItem');
const placeOrderForUser = require('./PlaceOrderForUser');
const addAddressForOrder = require('./AddAddressForOrder');

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
    case enums.ADD_ADDRESS:
      addAddressForOrder(userId, valueOfItem, cb);
      break;
    case enums.PLACE_ORDER:
      placeOrderForUser(userId, cb);
      break;
    default:
      break;
  }
};

module.exports = handleOrderStatus;
