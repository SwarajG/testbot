const nodemailer = require('nodemailer');
const enums = require('../utils/enum');

const itemHtmlForItem = item => `
  <div style="display: inline-block; margin:10px 0 0 10px; flex-grow: 1; width: calc(100% * (1/4) - 10px - 1px);">
    <p><b>Item Name:</b> ${item.name}</p>
    <p><b>Item Price:</b> ${item.price}</p>
    <p><b>Item quantity:</b> ${item.quantity}</p>
  </div>
`;

const getLocationIfNeeded = (deliverMethod) => {
  if (deliverMethod.method && deliverMethod.method === enums.PICKUP) {
    return `<p><b>Delivery Pickup Location:</b> ${deliverMethod.location}</p>`;
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
      <h1>Order</h1>
      <h2>Status: ${status}</h2>
      ${itemList.map(item => itemHtmlForItem(item))}
      <p><b>Phone Number:</b> ${phone}</p>
      <div>
        <p><b>Delivery Method:</b> ${deliverMethod.method}</p>
        ${getLocationIfNeeded(deliverMethod)}
        <p><b>Phone Number:</b> ${phone}</p>
      </div>
      <p><b>Order Id:</b> ${orderId}</p>
      <p><b>fbUser Id:</b> ${userId}</p>
    </body>
    </html>
  `;
  return htmlForEmail;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.myEmail,
    pass: process.env.myPassword,
  },
});

const mailOptions = order => ({
  from: process.env.myEmail,
  to: 'gandhiswaraj9067008148@gmail.com',
  subject: 'Order for up & up',
  html: emailHtml(order),
});

module.exports = (order) => {
  transporter.sendMail(mailOptions(order), (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
