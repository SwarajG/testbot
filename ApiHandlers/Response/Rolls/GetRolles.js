const priceList = require('../Price');

const createElements = priceList.rolls.map((roll) => {
  const {
    name,
    image,
    value,
    price,
  } = roll;
  const buttonTitle = `Add to cart(Rs ${price})`;
  return {
    title: name,
    image_url: image,
    buttons: [{
      type: 'postback',
      payload: `add_${value}_roll`,
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
