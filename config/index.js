const mongodbUser = process.env.MONGO_USER;
const mongodbPWd = process.env.MONGO_PWD;
const mongodbDataBase = 'upandup-chatbot';
const mongodbConnection = 'ds245277.mlab.com:45277';

module.exports = {
  mongodbUrl: `mongodb://${mongodbUser}:${mongodbPWd}@${mongodbConnection}/${mongodbDataBase}`,
};
