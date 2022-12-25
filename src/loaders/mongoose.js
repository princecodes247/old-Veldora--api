const mongoose = require('mongoose');
const config = require('../config');

module.exports = async dbString => {
  mongoose.Promise = global.Promise;
  console.log(dbString || config.databaseURL);
  const connection = await mongoose
    .connect(dbString || config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => console.log(err));

  return connection.connection;
};
