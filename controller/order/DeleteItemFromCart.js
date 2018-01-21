const Order = require('../../model/order');

const deleteItemFromCart = (userId, itemId, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting order...');
    } else {
      const order = orderList[0];
      const orderObjectId = order._id;
      const newItemList = order.itemList.filter(item => item.itemId !== itemId);
      const updatedOrder = Object.assign(order, { itemList: newItemList });
      Order
        .update(orderObjectId, updatedOrder)
        .then(cb)
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = deleteItemFromCart;
