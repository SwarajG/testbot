const Order = require('../model/order');
const helper = require('../utils/helper');
const OUTLETS = require('./Response/Outlet');
const asyncCallSend = require('./AsyncCallSendApi');
const setMethodAsDeliver = require('../controller/order/DeliverMethodForOrder');

const showAmountAndProcess = (senderPsid, payload) => {
  let response = {};
  if (payload === 'order-pickup') {
    response = OUTLETS;
  } else if (payload === 'order-delivery') {
    setMethodAsDeliver(senderPsid, (err) => {
      if (err) console.log(err);
    });
    response = {
      text: 'Please enter your phone number, without it order will not be considered as a valid order. We will confirm your address on this phone number',
    };
  }

  Order.getOpenOrderByUserId(senderPsid, (getOrderErr, orderList) => {
    if (getOrderErr) {
      console.log('Error in getting the order...', getOrderErr);
    } else {
      const order = orderList[0];
      const { itemList: finalItemLsit } = order;
      const totalAmount = helper.getTotalAmount(finalItemLsit);
      console.log('totalAmount: ', totalAmount);
      const totalAmountText = {
        text: `Your total amount for the order is ${totalAmount} with GST and packaging and with delivery chaarges.`,
      };
      asyncCallSend(senderPsid, totalAmountText)
        .then(() => asyncCallSend(senderPsid, response))
        .catch(err => console.log(err));
    }
  });
};

module.exports = showAmountAndProcess;
