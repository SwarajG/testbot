const priceList = require('../Price');

const createElements = priceList.biryani.map((biryani) => {
  const {
    name,
    image,
    value,
    size,
  } = biryani;
  const buttons = size.map((biryaniSize) => {
    const buttonTitle = `Add to cart (Rs. ${biryaniSize.price})`;
    return {
      type: 'postback',
      payload: `add_${value}_${biryaniSize.type}_biryani`,
      title: buttonTitle,
    };
  });
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
