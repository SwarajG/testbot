const mongoose = require('mongoose');
const utils = require('../utils');
const enums = require('../utils/enum');
const _ = require('lodash');

const orderSchema = mongoose.Schema({
  orderId: String,
  time: Date,
  uid: String,
  address: String,
  status: String,
  itemList: Array,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  create: (newOrder) => {
    const clonedOrder = _.cloneDeep(newOrder);
    clonedOrder.orderId = utils.getUniqueId();
    const order = new Order(clonedOrder);
    const promise = new Promise((resolve, reject) => {
      order.save((err, dbOrder) => {
        if (err) reject(err);
        resolve(dbOrder);
      });
    });
    return promise;
  },
  update: (orderId, updatedOrder) => {
    const promise = new Promise((resolve, reject) => {
      Order.findOneAndUpdate({ orderId }, updatedOrder, (err, dbOrder) => {
        if (err) reject(err);
        resolve(dbOrder);
      });
    });
    return promise;
  },
  delete: (orderId) => {
    const promise = new Promise((resolve, reject) => {
      Order.find({ orderId }).remove((err) => {
        if (err) reject(err);
        resolve('order deleted');
      });
    });
    return promise;
  },
  cancelOrderForUserId: () => {

  },
  getOpenOrderByUserId: (userId, cb) => {
    Order
      .find({ userId })
      .where('status').equals(enums.ORDER_STATUS.OPEN)
      .exec(cb);
  },
};
