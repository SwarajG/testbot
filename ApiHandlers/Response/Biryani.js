const priceList = require('./Price');
const enums = require('../../utils/enum');

const createElements = priceList.biryani.map((biryani) => {
  const {
    name,
    image,
    value,
    price,
  } = biryani;
  const buttons = [{
    type: 'postback',
    payload: `${enums.ADD_ITEM}_${value}`,
    title: `Add to cart(Rs. ${price})`,
  }, {
    type: 'postback',
    payload: 'show-menu',
    title: 'Back to menu',
  }];
  buttons.push();
  return {
    title: name,
    image_url: image,
    buttons,
  };
});

module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: createElements,
    },
  },
};
