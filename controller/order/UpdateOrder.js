const Order = require('../../model/order');

const updateOrder = (userId, item, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting a order for user...');
    } else {
      const order = orderList[0];
      const orderObjectId = order._id;
      const { itemId } = item;
      const isItemExists = order.itemList.find(tempItem => tempItem.itemId === itemId);
      // if (!isItemExists) {
      order.itemList.push(item);
      Order
        .update(orderObjectId, order)
        .then(response => cb(null, response))
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
      // }
    }
  });
};

module.exports = updateOrder;
