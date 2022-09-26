const mongoose = require('mongoose');
const config = require('../config');

module.exports = async dbString => {
  mongoose.Promise = global.Promise;
  const connection = await mongoose
    .connect(dbString || config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => console.log('err'));

  const close = async () => {
    await connection.connection.close();
  };
  return connection.connection;
};
