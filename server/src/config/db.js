import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn('\n⚠️ [Database Warning]: MONGODB_URI is not configured with valid credentials in .env.');
    console.warn('➡️ Please update MONGODB_URI in .env with your MongoDB Atlas connection string.');
    console.warn('➡️ The server will start in offline/mock-fallback mode until MongoDB Atlas is connected.\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB Atlas Connected]: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    console.warn('➡️ Check your MongoDB Atlas Network Access (IP Whitelist: 0.0.0.0/0) and credentials in .env.\n');
    return false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️ [MongoDB Atlas Disconnected]');
});

