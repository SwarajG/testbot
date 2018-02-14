const itemList = require('./itemList');

module.exports = {
  getItemById: (itemId) => {
    const allItems = [];
    Object.values(itemList).forEach(itemInfoList => allItems.push(itemInfoList));
    const allFilteredItems = allItems
      .reduce((prevItem, currItem) => prevItem.concat(currItem), [])
      .filter(item => item.value);
    return allFilteredItems.find(item => item.value === itemId);
  },
  getTotalAmount: (orderItemList) => {
    const totalPrice = orderItemList
      .reduce((accumulator, currentItem) =>
        accumulator + (currentItem.price * currentItem.quantity), 0);
    return totalPrice + ((5 * totalPrice) / 100) + ((8 * totalPrice) / 100) + 30;
  },
};

