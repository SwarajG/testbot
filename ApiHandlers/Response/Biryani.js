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
    payload: `${enums.ADD_ITEM}-regular_${value}`,
    title: 'Add to cart (Regular)',
  }, {
    type: 'postback',
    payload: `${enums.ADD_ITEM}-jumbo_${value}`,
    title: 'Add to cart (Jumbo)',
  }, {
    type: 'postback',
    payload: 'show-menu',
    title: 'Back to menu',
  }];
  buttons.push();
  return {
    title: name,
    subtitle: `Regular: (Rs. ${price.regular}), Jumbo: (Rs. ${price.jumbo})`,
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
