const priceList = require('../Price');

const createElements = priceList.beverages.map((beverage) => {
  const {
    name,
    image,
    value,
    price,
  } = beverage;
  const buttonTitle = `Add to cart(Rs. ${price})`;
  return {
    title: name,
    image_url: image,
    buttons: [{
      type: 'postback',
      payload: `add_${value}_beverage`,
      title: buttonTitle,
    }],
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
