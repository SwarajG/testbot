const Order = require('../../model/order');
const _ = require('lodash');

const addQuantityForItem = (userId, itemId, quantity, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error gettting the users...');
    }
    const order = _.cloneDeep(orderList[0]);
    const orderObjectId = order._id;
    const newOrderList = order.itemList.map((item) => {
      if (item.itemId === item) {
        const clonedItem = _.cloneDeep(item);
        clonedItem.quantity = quantity;
      }
      return item;
    });
    order.itemList = newOrderList;
    Order
      .update(orderObjectId, order)
      .then(response => cb(null, response))
      .catch(updateErr => console.log('Error in updating order for user...', updateErr));
  });
};

module.exports = addQuantityForItem;
