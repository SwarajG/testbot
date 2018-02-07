const Order = require('../../model/order');
const enums = require('../../utils/enum');

const pickupLocationForOrder = (userId, pickupLocation, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting order...');
    } else {
      const order = orderList[0];
      const orderObjectId = order._id;
      order.deliverMethod = {
        method: enums.PICKUP,
        location: pickupLocation,
      };
      console.log(pickupLocation, order);
      Order
        .update(orderObjectId, order)
        .then(response => cb(null, response))
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = pickupLocationForOrder;
