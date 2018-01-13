module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [{
        title: 'Welcome to up&up, where we serve homely food, right at your doorsteps',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/assets.limetray.com/assets/user_images/slider_images/cropped/1509016084_Up26upHero1.jpg',
        subtitle: 'The taste that bring you back.',
        buttons: [
          {
            type: 'postback',
            payload: 'show-menu',
            title: 'Show menu',
          },
        ],
      }],
    },
  },
};
