const nodemailer = require('nodemailer');
const enums = require('../utils/enum');

const itemTextForItem = item => `${item.name} with price: ${item.price} with quantity: ${item.quantity}\n`;

const emailText = (order) => {
  const {
    orderId,
    userId,
    status,
    phone,
    deliverMethod,
    itemList,
  } = order;
  return `Order with ${orderId} and fbUserId ${userId} has placed order with status${status}. List of items in the order with the quantity is down below. \n
          ${itemList.map(item => itemTextForItem(item))}
          Phone number for this order is ${phone}
          User has choose ${deliverMethod.method}${deliverMethod.method === enums.PICKUP ? ` on location ${deliverMethod.location}` : '.'}
          `;
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
  text: emailText(order),
});

module.export = (order) => {
  transporter.sendMail(mailOptions(order), (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
