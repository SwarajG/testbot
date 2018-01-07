const priceList = require('../Price');

const createElements = priceList.combos.map((combo) => {
  const {
    name,
    image,
    value,
    price,
  } = combo;
  const buttonTitle = `Add to cart(Rs. ${price})`;
  return {
    title: name,
    image_url: image,
    buttons: [{
      type: 'postback',
      payload: `add_${value}_${price}_combo`,
      title: buttonTitle,
    }, {
      type: 'postback',
      payload: 'show_menu',
      title: 'Back to menu',
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
