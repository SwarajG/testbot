const Order = require('../../model/order');
const _ = require('lodash');

const deleteItemFromCart = (userId, itemId, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting order...');
    } else {
      const order = orderList[0];
      const orderObjectId = order._id;
      const newOrder = _.cloneDeep(order);
      const newItemList = newOrder.itemList.filter(item => item.itemId !== itemId);
      newOrder.itemList = newItemList;
      Order
        .update(orderObjectId, newOrder)
        .then(cb)
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = deleteItemFromCart;
