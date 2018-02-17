const mongodbUser = process.env.MONGO_USER;
const mongodbPWd = process.env.MONGO_PWD;
const mongodbDataBase = process.env.DB_NAME;
const mongodbConnection = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}`;

module.exports = {
  mongodbUrl: `mongodb://${mongodbUser}:${mongodbPWd}@${mongodbConnection}/${mongodbDataBase}`,
};
