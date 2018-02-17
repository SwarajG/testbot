const mongodbUser = process.env.MONGO_USER;
const mongodbPWd = process.env.MONGO_PWD;
const env = process.env.NODE_ENV;
const mongodbDataBase = 'upandup-chatbot';
const mongodbConnection = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}`;
let mongodbUrl;

if (env === 'prod') {
  mongodbUrl = `mongodb://${mongodbUser}:${mongodbPWd}@${mongodbConnection}/${mongodbDataBase}`;
} else {
  mongodbUrl = `mongodb+srv://${mongodbUser}:${mongodbPWd}@${process.env.MONGO_URL}/${mongodbDataBase}`;
}

module.exports = {
  mongodbUrl,
};
