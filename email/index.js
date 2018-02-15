const ses = require('node-ses');
const enums = require('../utils/enum');
const utils = require('../utils/helper');

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

const emailHtml = (order, user) => {
  const {
    orderId,
    userId,
    status,
    phone,
    deliverMethod,
    itemList,
  } = order;
  const {
    first_name: firstName,
    last_name: lastName,
    profile_pic: userImage,
  } = user;
  const totalAmount = utils.getTotalAmount(itemList);
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
      <div>
        <div style="height: 100px; width: 100px; background: url('${userImage}') no-repeat center center; background-size: cover; border-radius: 50%; margin: 0 auto;"></div>
        <p>FirstName: ${firstName}</p>
        <p>LastName: ${lastName}</p>
      </div>
      <div style="display: flex; flex-wrap:wrap;">
        ${itemList.map(item => itemHtmlForItem(item)).join('')}
      </div>
      <p style="text-align: center"><b>Phone Number:</b> ${phone}</p>
      <div>
        <p style="text-align: center"><b>Delivery Method:</b> ${deliverMethod.method}</p>
        ${getLocationIfNeeded(deliverMethod)}
        <p style="text-align: center"><b>Phone Number:</b> ${phone}</p>
      </div>
      <p style="text-align: center;"><b>Total with GST(5% (2.5% cgst, 2.5% sgst)) and packaging charges (8%) and delivery:</b> ${totalAmount}</p>
      <p style="text-align: center"><b>Order Id:</b> ${orderId}</p>
      <p style="text-align: center"><b>fbUser Id:</b> ${userId}</p>
    </body>
    </html>
  `;
  return htmlForEmail;
};

module.exports = (order, userProfile) => {
  client.sendEmail({
    // to: 'swapnil@yuppfoods.com',
    to: 'gandhiswaraj94@gmail.com',
    from: 'gandhiswaraj94@gmail.com',
    subject: 'Order for Up & Up',
    message: emailHtml(order, userProfile),
    altText: 'Order Details',
  }, (err) => {
    console.log(err);
  });
};
