const Order = require('../../model/order');
const enums = require('../../utils/enum');
const updateOrderStatus = require('./UpdateOrder');

const PlaceOrderForUser = (userId, cb) => {
  Order.getOpenOrderByUserId(userId, (err, order) => {
    if (err) {
      console.log('Error in getting the order...', err);
    } else {
      console.log(order);
      const status = enums.ORDER_STATUS.ORDERD;
      updateOrderStatus(order, status);
      cb(order);
    }
  });
};

module.exports = PlaceOrderForUser;