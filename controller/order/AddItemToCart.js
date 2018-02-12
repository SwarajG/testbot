const Order = require('../../model/order');
const updateOrder = require('./UpdateOrder');
const createOrder = require('./CreateOrder');

const helper = require('../../utils/helper');

const addItemToCart = (userId, itemIdentifier, cb) => {
  const { value: itemId, name, price } = helper.getItemById(itemIdentifier);
  const quantity = 1;
  let newName = name;
  let newPrice = price;
  if (typeof price === 'object') {
    if (name.indexOf('regular') > -1) {
      newPrice = price.regular;
      newName = `${name} (Regular)`;
    } else if (name.indexOf('jumbo') > -1) {
      newPrice = price.jumbo;
      newName = `${name} (Jumbo)`;
    }
  }
  const item = {
    itemId,
    name: newName,
    price: newPrice,
    quantity,
  };
  Order.getOpenOrderByUserId(userId, (err, response) => {
    if (err) {
      console.log('Error gettting the users...');
    }
    if (response.length === 1) {
      updateOrder(userId, item, cb);
    } else {
      createOrder(userId, item, cb);
    }
  });
};

module.exports = addItemToCart;
