import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable');
}

let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConn) {
    return cachedConn;
  }
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGO_URL as string).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cachedConn = await cachedPromise;

  if(cachedConn){
    console.log('Connected to MongoDB');
  }
  return cachedConn;
}
