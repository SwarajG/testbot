const enums = require('../../utils/enum');
const priceList = require('./Price');

const createElements = priceList.outlets.map(outlet => ({
  title: outlet.name,
  image_url: outlet.image,
  subtitle: outlet.address,
  buttons: [{
    type: 'postback',
    payload: `${enums.PICKUP}_${outlet.value}`,
    title: 'Select',
  }],
}));

module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: createElements,
    },
  },
};
