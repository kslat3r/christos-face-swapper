const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const connect = () => {
  const opts = {
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
  };

  if (process.env.NODE_ENV !== 'development' && process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, opts);
  } else if (config.get('dbUrl')) {
    mongoose.connect(config.get('dbUrl'), opts);
  }
};

connect();

if (mongoose.connection) {
  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
}
