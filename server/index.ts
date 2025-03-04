import express from 'express';
import { MongoClient } from 'mongodb';
import * as cron from 'node-cron';
import * as dotenv from 'dotenv';
import { getWoWToken } from '../src/lib/api/blizzard/token';

interface TokenPrice {
  price: number;
  timestamp: Date;
}

dotenv.config({ path: '.env.local' });  

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI!;
const client = new MongoClient(MONGODB_URI);

async function updateTokenPrice() {
  try {
    const tokenPrice = await getWoWToken();
    const db = client.db('wowlink');
    const collection = db.collection<{ kr: TokenPrice[] }>('tokens');

    await collection.updateOne(
      {},
      {
        $push: {
          kr: {
            price: tokenPrice,
            timestamp: new Date()
          }
        }
      },
      { upsert: true }
    );

    console.log('Token price updated:', tokenPrice);
  } catch (error) {
    console.error('Error updating token price:', error);
  }
}

cron.schedule('0 * * * *', async () => {
  console.log('Running cron job to update token price');
  await updateTokenPrice();
});

app.listen(PORT, async () => {
  try {
    await client.connect();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}); 