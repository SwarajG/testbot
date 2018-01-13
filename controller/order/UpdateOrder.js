const Order = require('../../model/order');

const updateOrder = (userId, item, cb) => {
  Order.getOpenOrderByUserId(userId, (err, order) => {
    if (err) {
      console.log('Error in getting a order for user...');
    } else {
      console.log(order);
      const orderObjectId = order._id;
      const updatedOrder = Object.assign(order, { itemList: order.itemList.push(item) });
      Order
        .update(orderObjectId, updatedOrder)
        .then(cb)
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = updateOrder;
