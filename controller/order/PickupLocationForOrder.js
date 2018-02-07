const Order = require('../../model/order');
const _ = require('lodash');

const pickupLocationForOrder = (userId, pickupLocation, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting order...');
    } else {
      const order = _.cloneDeep(orderList[0]);
      const orderObjectId = order._id;
      order.pickupLocation = pickupLocation;
      console.log(pickupLocation, order);
      Order
        .update(orderObjectId, order)
        .then(cb)
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = pickupLocationForOrder;
