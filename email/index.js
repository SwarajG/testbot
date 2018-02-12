const ses = require('node-ses');
const enums = require('../utils/enum');

const client = ses.createClient({
  key: process.env.AWS_ACCESS_KEY,
  secret: process.env.SECREAT_KEY,
});

const itemHtmlForItem = item => `
  <div style="display: inline-block; margin:10px 0 0 10px; flex-grow: 1;">
    <p><b>Item Name:</b> ${item.name}</p>
    <p><b>Item Price:</b> ${item.price}</p>
    <p><b>Item quantity:</b> ${item.quantity}</p>
  </div>
`;

const getLocationIfNeeded = (deliverMethod) => {
  if (deliverMethod.method && deliverMethod.method === enums.PICKUP) {
    return `<p style="text-align: center"><b>Delivery Pickup Location:</b> ${deliverMethod.location}</p>`;
  }
  return '';
};

const emailHtml = (order) => {
  const {
    orderId,
    userId,
    status,
    phone,
    deliverMethod,
    itemList,
  } = order;
  const totalPrice = itemList
    .reduce((accumulator, currentItem) =>
      accumulator + (currentItem.price * currentItem.quantity), 0);
  const priceAfterGST = totalPrice - ((5 * totalPrice) / 100);
  const htmlForEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>JS Bin</title>
      <style>
        body {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <img src="https://s3-ap-southeast-1.amazonaws.com/upandup-resources/order.jpg" style="max-width: 100%" />
      <h1 style="text-align: center">Order</h1>
      <h2 style="text-align: center">Status: ${status}</h2>
      <div style="display: flex; flex-wrap:wrap;">
        ${itemList.map(item => itemHtmlForItem(item))}
      </div>
      <p style="text-align: center"><b>Phone Number:</b> ${phone}</p>
      <div>
        <p style="text-align: center"><b>Delivery Method:</b> ${deliverMethod.method}</p>
        ${getLocationIfNeeded(deliverMethod)}
        <p style="text-align: center"><b>Phone Number:</b> ${phone}</p>
      </div>
      <p style="text-align: center;"><b>Total with GST(5%):</b> ${priceAfterGST}</p>
      <p style="text-align: center"><b>Order Id:</b> ${orderId}</p>
      <p style="text-align: center"><b>fbUser Id:</b> ${userId}</p>
    </body>
    </html>
  `;
  return htmlForEmail;
};

module.exports = (order) => {
  client.sendEmail({
    to: 'gandhiswaraj94@gmail.com',
    from: 'gandhiswaraj94@gmail.com',
    subject: 'Order for Up & Up',
    message: emailHtml(order),
    altText: 'Order Details',
  }, (err) => {
    console.log(err);
  });
};
