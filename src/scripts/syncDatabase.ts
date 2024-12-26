// src/scripts/syncDatabase.ts
import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

async function syncDatabase() {
  try {
    // JSON 파일 읽기
    const jsonData = await fs.readFile(
      path.join(process.cwd(), '/db.json'),
      'utf-8'
    );
    const data = JSON.parse(jsonData);

    // MongoDB 연결
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db('wowlink');

    // 각 컬렉션 동기화
    const collections = ['sites', 'discords', 'streamers', 'tips'];

    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      
      // 기존 데이터 삭제
      await collection.deleteMany({});
      
      // 새 데이터 삽입
      if (data[collectionName] && Array.isArray(data[collectionName])) {
        await collection.insertMany(data[collectionName]);
        console.log(`${collectionName}: ${data[collectionName].length} documents inserted`);
      }
    }

    console.log('Database sync completed successfully');
    await client.close();
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// 파일 변경 감지 기능
const watchDatabase = async () => {
  const DB_PATH = path.join(process.cwd(), 'src/db.json');
  
  console.log('Watching for file changes...');
  
  fs.watch(DB_PATH, (eventType) => {
    if (eventType === 'change') {
      console.log('Change detected in db.json');
      syncDatabase();
    }
  });

  // 초기 동기화
  await syncDatabase();
};

// 스크립트 실행
if (process.argv.includes('--watch')) {
  watchDatabase();
} else {
  syncDatabase();
}