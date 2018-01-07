module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [{
        title: 'Combos',
        subtitle: 'Favourite biryanis & rolls',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani.jpg',
        buttons: [{
          type: 'postback',
          payload: 'show_more_combos',
          title: 'Show more',
        }, {
          type: 'postback',
          payload: 'back_to_menu',
          title: 'Back to menu',
        }],
      }, {
        title: 'Biryani',
        subtitle: 'Favourite biryanis & rolls',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryanichick.jpg',
        buttons: [{
          type: 'postback',
          payload: 'show_more_biryani',
          title: 'Show more',
        }, {
          type: 'postback',
          payload: 'back_to_menu',
          title: 'Back to menu',
        }],
      }, {
        title: 'Rolls',
        subtitle: 'Favourite biryanis & rolls',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
        buttons: [{
          type: 'postback',
          payload: 'show_more_rolls',
          title: 'Show more',
        }, {
          type: 'postback',
          payload: 'back_to_menu',
          title: 'Back to menu',
        }],
      }, {
        title: 'Dessert and Beverages',
        subtitle: 'Favourite biryanis & rolls',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-phirni.jpg',
        buttons: [{
          type: 'postback',
          payload: 'show_more_dessert',
          title: 'Show more',
        }, {
          type: 'postback',
          payload: 'back_to_menu',
          title: 'Back to menu',
        }],
      }],
    },
  },
};
