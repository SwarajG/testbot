module.exports = {
  text: 'Would you like to continue ordering?',
  quick_replies: [{
    content_type: 'text',
    title: 'Yes, Continue',
    payload: 'show-menu',
  }, {
    content_type: 'text',
    title: 'Place Order',
    payload: 'place-order',
  }, {
    content_type: 'text',
    title: 'Show cart',
    payload: 'show-cart',
  }],
};
