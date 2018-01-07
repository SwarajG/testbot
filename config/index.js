const mongodbUser = 'SwarajG';
const mongodbPWd = 'Girlsrhell20';
const mongodbDataBase = 'upandup-chatbot';
const mongodbConnection = 'ds245277.mlab.com:45277';

module.exports = {
  mongodbUrl: `mongodb://${mongodbUser}:${mongodbPWd}@${mongodbConnection}/${mongodbDataBase}`,
};
