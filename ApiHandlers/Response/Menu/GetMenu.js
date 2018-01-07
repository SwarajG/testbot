const menu = require('./MenuInfo');

const menuList = menu.map((category) => {
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
