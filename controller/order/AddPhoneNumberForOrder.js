const Order = require('../../model/order');
const _ = require('lodash');

const addPhoneNumberForOrder = (userId, phone, cb) => {
  Order.getOpenOrderByUserId(userId, (err, orderList) => {
    if (err) {
      console.log('Error in getting a order for user...');
    } else if (orderList.length) {
      const order = _.cloneDeep(orderList[0]);
      const orderObjectId = order._id;
      order.phone = phone;
      Order
        .update(orderObjectId, order)
        .then(response => cb(null, response))
        .catch(updateErr => console.log('Error in updating order for user...', updateErr));
    }
  });
};

module.exports = addPhoneNumberForOrder;
