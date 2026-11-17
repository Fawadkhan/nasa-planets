import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = "mongodb+srv://fawadkhn15:HungryRaven.123@cluster0.izc9fon.mongodb.net/test" 


// console.log("MONGO_URL PROCESS ENV", process.env)

mongoose.connection.once('connected', () => {
  console.log('========================= Mongoose connected ==========================');
});

mongoose.connection.on('error', (err) => {
  console.error('========================= Mongoose connection error: ', err, '=========================');
});

async function connectWithRetry(): Promise<void> {
  console.log('Attempting MongoDB connection...');

  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB connected successfully');
    console.log('Ready state:', mongoose.connection.readyState);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export default connectWithRetry;