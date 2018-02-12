const mongoose = require('mongoose');
const utils = require('../utils');
const enums = require('../utils/enum');

const { Mixed } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema({
  orderId: String,
  time: Date,
  uid: String,
  address: String,
  status: String,
  itemList: Array,
  userId: String,
  deliverMethod: Mixed,
  phone: String,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  create: (newOrder) => {
    const orderId = {
      orderId: utils.getUniqueId(),
    };
    const order = new Order(Object.assign(newOrder, orderId));
    const promise = new Promise((resolve, reject) => {
      order.save((err, dbOrder) => {
        if (err) reject(err);
        resolve(dbOrder);
      });
    });
    return promise;
  },
  update: (orderObjectId, updatedOrder) => {
    const promise = new Promise((resolve, reject) => {
      const orderID = mongoose.Types.ObjectId(orderObjectId);
      Order.findOneAndUpdate({ _id: orderID }, updatedOrder, (err, dbOrder) => {
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
      .find({
        userId,
        status: enums.ORDER_STATUS.OPEN,
      })
      .exec(cb);
  },
  getOrderedOrderByUserId: (userId, cb) => {
    Order
      .find({
        userId,
        status: enums.ORDER_STATUS.ORDERD,
      })
      .exec(cb);
  },
};
