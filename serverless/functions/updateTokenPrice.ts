import { MongoClient, Collection } from 'mongodb';
import { getWoWToken } from '../../src/lib/api/blizzard/token';

interface TokenPrice {
  price: number;
  timestamp: Date;
}

interface TokenDocument {
  kr: TokenPrice[];
}

let cachedDb: any = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }
  
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('wowlink');
  
  cachedDb = db;
  return db;
}

export const handler = async (event: any, context: any) => {
  // Lambda 함수 실행 컨텍스트가 재사용될 수 있도록 설정
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI!);
    const tokenPrice = await getWoWToken();
    // const collection = db.collection('tokens');
    const collection = db.collection('tokens') as Collection<TokenDocument>;

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
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Token price updated successfully', price: tokenPrice })
    };
  } catch (error) {
    console.error('Error updating token price:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating token price', error: String(error) })
    };
  }
};