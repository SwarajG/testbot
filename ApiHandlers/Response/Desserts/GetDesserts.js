const priceList = require('../Price');

const createElements = priceList.desserts.map((dessert) => {
  const {
    name,
    image,
    value,
    price,
  } = dessert;
  const buttonTitle = `Add to cart(Rs ${price})`;
  return {
    title: name,
    image_url: image,
    buttons: [{
      type: 'postback',
      payload: `add_${value}_dessert`,
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
