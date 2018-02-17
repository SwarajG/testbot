const mongodbUser = process.env.MONGO_USER;
const mongodbPWd = process.env.MONGO_PWD;
const mongodbDataBase = 'upandup-chatbot';
const mongodbConnection = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}`;
let mongodbUrl;

if (mongodbUser && mongodbPWd) {
  mongodbUrl = `mongodb://${mongodbUser}:${mongodbPWd}@${mongodbConnection}/${mongodbDataBase}`;
} else {
  mongodbUrl = `mongodb://${mongodbConnection}/${mongodbDataBase}`;
}

module.exports = {
  mongodbUrl,
};
