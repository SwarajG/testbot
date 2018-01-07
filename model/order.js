const mongoose = require('mongoose');
// const utils = require('../utils');

const orderSchema = mongoose.Schema({
  orderId: String,
  time: Date,
  uid: String,
  addressId: String,
  status: String,
  itemList: Array,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  create: () => {},
  update: () => {},
  delete: () => {},
};
