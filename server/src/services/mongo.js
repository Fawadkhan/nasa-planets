const mongoose = require('mongoose');
const MONGO_URL = `${process.env.MONGODB_URI}` || `${process.env.REACT_APP_MONGODB_URI}`

console.log("MONGO_URL PROCESS ENV", process.env)

mongoose.connection.once('connected', () => {
  console.log('========================= Mongoose connected ==========================');
});

mongoose.connection.on('error', (err) => {
  console.error('========================= Mongoose connection error: ', err, '=========================');
});

async function connectWithRetry() {
  console.log('MongoDB connection with retry')
  return await mongoose.connect(MONGO_URL);
}

module.exports = connectWithRetry