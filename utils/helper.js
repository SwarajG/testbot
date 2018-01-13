const itemList = require('./itemList');

module.exports = {
  getItemById: (itemId) => {
    const allItems = [];
    Object.values(itemList).forEach(itemInfoList => allItems.push(itemInfoList));
    return allItems
      .reduce((prevItem, currItem) => prevItem.concat(currItem), [])
      .find(item => item.value === itemId) || 'Item not found...';
  },
};

