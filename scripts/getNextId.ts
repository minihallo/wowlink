import { connectToDatabase } from '../src/lib/db/mongodb.ts'

async function getNextId(collectionName: string) {
  try {
    const { db } = await connectToDatabase()
    
    // id 필드를 기준으로 내림차순 정렬 후 첫 번째 문서 가져오기
    const lastDocument = await db.collection(collectionName)
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray()
    
    const nextId = lastDocument.length > 0 ? lastDocument[0].id + 1 : 1
    console.log(`${collectionName}의 다음 사용 가능한 id: ${nextId}`)
    return nextId
  } catch (e) {
    console.error('Error:', e)
  }
}

// 각 컬렉션의 다음 id 확인
async function checkAllCollections() {
  await getNextId('sites')
  await getNextId('discords')
}

checkAllCollections()