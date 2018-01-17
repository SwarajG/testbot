const Order = require('../../model/order');

const updateOrder = (userId, item, cb) => {
  Order.getOpenOrderByUserId(userId, (err, order) => {
    if (err) {
      console.log('Error in getting a order for user...');
    } else {
      console.log('updateOrder: ', order);
      const orderObjectId = order._id;
      order.itemList.push(item);
      Order
        .update(orderObjectId, order)
        .then(cb)
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = updateOrder;
