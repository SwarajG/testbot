const helper = require('../utils/helper');

const changeItemQuntText = itemName => `How many ${itemName} do you need?`;

const addItemQuickReplies = itemId => (
  [...Array(5).keys()].map(value => ({
    content_type: 'text',
    title: value + 1,
    payload: `quantity_${itemId}_${value + 1}`,
  }))
);

const changeQuantityForItem = itemId => ({
  text: changeItemQuntText(helper.getItemById(itemId).name),
  quick_replies: addItemQuickReplies(itemId),
});

module.exports = changeQuantityForItem;
