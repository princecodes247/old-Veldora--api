const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  mongoose.Promise = global.Promise;
  const connection = await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => console.log('err'));

  return connection.connection.db;
};
