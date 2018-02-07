const Order = require('../../model/order');
const enums = require('../../utils/enum');
const updateOrderStatus = require('./UpdateOrder');
const _ = require('lodash');

const PlaceOrderForUser = (userId, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting the order...', err);
    } else {
      const order = _.cloneDeep(orderList[0]);
      const status = enums.ORDER_STATUS.ORDERD;
      updateOrderStatus(order, status);
      cb(order);
    }
  });
};

module.exports = PlaceOrderForUser;
