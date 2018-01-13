const itemList = require('./itemList');

module.exports = {
  getItemById: (itemId) => {
    const allItems = [];
    Object.values(itemList).forEach(itemInfoList => allItems.push(itemInfoList));
    const allFilteredItems = allItems
      .reduce((prevItem, currItem) => prevItem.concat(currItem), [])
      .filter(item => item.value);
    console.log(allFilteredItems);
    return allFilteredItems.find(item => item.value === itemId);
  },
};

