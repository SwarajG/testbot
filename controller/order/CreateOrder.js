const Order = require('../../model/order');
const enums = require('../../utils/enum');

const createOrder = (userId, item, cb) => {
  console.log('userId', userId);
  const newOrder = {
    userId,
    itemList: [item],
    status: enums.ORDER_STATUS.OPEN,
  };
  Order
    .create(newOrder)
    .then(cb)
    .catch(err => console.log('Error in creating offer with err', err));
};

module.exports = createOrder;
