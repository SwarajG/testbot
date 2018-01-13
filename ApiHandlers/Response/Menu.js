const priceList = require('./Price');

const menuList = priceList.menu.map((category) => {
  const { name, imageUrl, button } = category;
  const { title, payload } = button;
  return {
    title: name,
    image_url: imageUrl,
    buttons: [{
      title,
      payload,
      type: 'postback',
    }],
  };
});

module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: menuList,
    },
  },
};
