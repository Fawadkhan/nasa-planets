const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Load environment variables only in non-production
}

const MONGO_URL = 'mongodb+srv://fawadkhn15:Testing123!@cluster0.izc9fon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



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

module.exports = connectWithRetry;