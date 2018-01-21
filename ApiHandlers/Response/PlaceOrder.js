const PlaceOrder = {
  text: 'Place choose a delivery method.',
  quick_replies: [{
    content_type: 'text',
    title: 'Delivery',
    payload: 'order-delivery',
  }, {
    content_type: 'text',
    title: 'Pick up',
    payload: 'order-pickup',
  }],
};

module.exports = PlaceOrder;
