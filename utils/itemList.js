module.exports = {
  menu: [{
    name: 'Combos',
    imageUrl: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
    button: {
      title: 'Show more',
      payload: 'show-combos',
    },
  }, {
    name: 'Biryani',
    imageUrl: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani.jpg',
    button: {
      title: 'Show more',
      payload: 'show-biryani',
    },
  }, {
    name: 'Rolls',
    imageUrl: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    button: {
      title: 'Show more',
      payload: 'show-rolls',
    },
  }, {
    name: 'Dessert',
    imageUrl: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-phirni.jpg',
    button: {
      title: 'Show more',
      payload: 'show-dessert',
    },
  }, {
    name: 'Beverages',
    imageUrl: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-chicksoup.jpg',
    button: {
      title: 'Show more',
      payload: 'show-beverages',
    },
  }],
  rolls: [{
    name: 'Paneer Roll',
    value: 'paneer-roll',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/paneer-roll.jpeg',
    price: 99,
  }, {
    name: 'Egg Roll',
    value: 'egg-roll',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/egg-roll.jpeg',
    price: 89,
  }, {
    name: 'Chicken Roll',
    value: 'chicken-roll',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/1509099231_KnorrShanghaiChickenWda.jpg',
    price: 99,
  }],
  desserts: [{
    name: 'Up & Up - Phirni',
    value: 'phirni-desserts',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-phirni.jpg',
    price: 99,
  }, {
    name: 'Rava Dry Fruit Halwa',
    value: 'halwa-desserts',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: 75,
  }],
  combos: [{
    name: 'Single (Serve 1)',
    descriptions: 'You will get a Biryani(Regular size) with a roll. You can choose from the options when we will confrim the order.',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
    value: 'single-serve',
    price: 199,
  }, {
    name: 'Up Friends Up (Serve 2)',
    descriptions: 'You will get a Biryani(Jumbo size) with a roll. You can choose from the options when we will confrim the order.',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
    value: 'friend-up-serve',
    price: 299,
  }, {
    name: 'Special-Single (Serve 1)',
    descriptions: 'You will get a Non veg Biryani(Regular size) with a roll. You can chooses from the options when we will confrim the order over phone.',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
    value: 'special-serve',
    price: 249,
  }, {
    name: 'Special-Up Friends Up (Serve 2)',
    descriptions: 'You will get a Non veg Biryani(Jumbo size) with a roll. You can choose from the options when we will confrim the order.',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
    value: 'special-friends-up-serve',
    price: 399,
  }],
  biryani: [{
    name: 'Up & Up Veg Dum Biryani',
    value: 'veg-dum-biryani',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 150,
      jumbo: 250,
    },
  }, {
    name: 'Masala Rajma Rice',
    value: 'masala-rajma-rice',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 130,
      jumbo: 210,
    },
  }, {
    name: 'Special Chole Rice',
    value: 'chole-rice',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 130,
      jumbo: 210,
    },
  }, {
    name: 'Mutton Dum Biryani',
    value: 'dum-biryani',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 180,
      jumbo: 330,
    },
  }, {
    name: 'Up & UP Chicken Kebab Biryani',
    value: 'kebab-dum-biryani',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 180,
      jumbo: 330,
    },
  }, {
    name: 'Chicken Dum Biryan',
    value: 'chicken-dum-biryani',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 150,
      jumbo: 250,
    },
  }, {
    name: 'Egg Dum Biryani',
    value: 'egg-dum-biryani',
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/upmup-biryani-roll.jpg',
    price: {
      regular: 130,
      jumbo: 210,
    },
  }],
  beverages: [{
    name: 'Coke [300 Ml]',
    value: 'coke',
    price: 35,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'Mineral Water [1 litre]',
    value: 'water',
    price: 30,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'Thumps Up [300 Ml]',
    value: 'thumps-up',
    price: 35,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'pepsi',
    value: 'pepsi-small',
    price: 15,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'slice (mango)',
    value: 'slice',
    price: 35,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'mountain dew',
    value: 'mountain-dew',
    price: 35,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'pepsi 750ml',
    value: 'pepsi-large',
    price: 40,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: '7 up 750ml',
    value: '7up',
    price: 40,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }, {
    name: 'TATA WATER +',
    value: 'tata-water',
    price: 20,
    image: 'https://s3-ap-southeast-1.amazonaws.com/upandup-resources/combo.jpeg',
  }],
  outlets: [{
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
  }],
};
