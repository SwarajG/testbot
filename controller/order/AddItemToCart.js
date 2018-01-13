const Order = require('../../model/order');
const updateOrder = require('./UpdateOrder');
const createOrder = require('./CreateOrder');

const helper = require('../../utils/helper');

const addItemToCart = (userId, itemIdentifier, cb) => {
  const { value: itemId, name, price } = helper.getItemById(itemIdentifier);
  const item = { itemId, name, price };
  console.log(item);
  Order.getOpenOrderByUserId(userId, (err, response) => {
    if (err) {
      console.log('Error gettting the users...');
    }
    console.log(response);
    if (response.length > 1) {
      updateOrder(userId, item, cb);
    } else {
      createOrder(item, cb);
    }
  });
};

module.exports = addItemToCart;