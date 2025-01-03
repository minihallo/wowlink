import { MongoClient, ObjectId } from 'mongodb';

interface TokenDocument {
  _id: string | ObjectId;
  kr: Array<{
    price: number;
    timestamp: Date;
  }>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 전역 변수 사용
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 새로운 클라이언트 생성
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('wowlink');
  return { client, db };
}

export async function getTokenHistory() {
  const { db } = await connectToDatabase();
  const tokenData = await db.collection<TokenDocument>('tokens').findOne({ _id: 'token_prices' });
  return tokenData?.kr || [];
}