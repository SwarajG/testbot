const Order = require('../../model/order');
const updateOrder = require('./UpdateOrder');
const createOrder = require('./CreateOrder');

const helper = require('../../utils/helper');

const addItemToCart = (userId, itemIdentifier, cb) => {
  const { value: itemId, name, price } = helper.getItemById(itemIdentifier);
  const item = { itemId, name, price };
  Order.getOpenOrderByUserId(userId, (err, response) => {
    if (err) {
      console.log('Error gettting the users...');
    }
    if (response.length === 1) {
      console.log('Updating Order...');
      updateOrder(userId, item, cb);
    } else {
      console.log('Creating Order...');
      createOrder(userId, item, cb);
    }
  });
};

module.exports = addItemToCart;
