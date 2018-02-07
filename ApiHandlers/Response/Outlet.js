const enums = require('../../utils/enum');

const outlets = [{
  name: 'Up & Up Bodakdev',
  image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/resturant1.jpeg',
  address: '3 f. f. kasturi complex opp shradha petrol pump opp athiti rest. judges ahmedabad, gujarat 380054',
  value: 'bodakdev',
}, {
  name: 'Up & Up South Bopal',
  image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/resturant2.jpeg',
  address: 'e-185, sobo center, gala gymkhana road, south bopal',
  value: 'southbopal',
}, {
  name: 'Up & Up Prahlad Nagar',
  image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/resturant1.jpeg',
  address: 'prahlad nagar',
  value: 'prahladnagar',
}, {
  name: 'Up & Up Navrangpura',
  image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/resturant2.jpeg',
  address: 'ground floor, shri krishna center, mithakali six roads, navrangpura, mithakhali',
  value: 'navrangpura',
}];

const createElements = outlets.map(outlet => ({
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
