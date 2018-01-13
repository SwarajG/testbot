const Order = require('../../model/order');

const updateOrderStatus = (userId, status, cb) => {
  Order.getOpenOrderByUserId(userId, (err, order) => {
    if (err) {
      console.log('Error in getting order...');
    } else {
      const orderObjectId = order._id;
      const updatedOrder = Object.assign(order, { status });
      Order
        .update(orderObjectId, updatedOrder)
        .then(cb)
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = updateOrderStatus;
