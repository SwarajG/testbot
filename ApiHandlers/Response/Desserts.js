const priceList = require('./Price');
const enums = require('../../utils/enum');

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
      payload: `${enums.ADD_ITEM}_${value}`,
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
