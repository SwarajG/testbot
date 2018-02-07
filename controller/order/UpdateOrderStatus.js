const Order = require('../../model/order');
const _ = require('lodash');

const updateOrderStatus = (userId, status, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting order...');
    } else {
      const order = _.cloneDeep(orderList[0]);
      const orderObjectId = order._id;
      const updatedOrder = Object.assign(order, { status });
      Order
        .update(orderObjectId, updatedOrder)
        .then(response => cb(null, response))
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = updateOrderStatus;
