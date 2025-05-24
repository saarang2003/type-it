import mongoose from 'mongoose';
import { dbConnect } from '../../lib/db';

export async function GET() {
  await dbConnect();

  const isConnected = mongoose.connection.readyState === 1;

  return new Response(
    JSON.stringify({
      connected: isConnected,
      status: isConnected ? '✅ MongoDB is connected' : '❌ MongoDB is NOT connected',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  );
}
