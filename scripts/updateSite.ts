// scripts/updateData.ts
import clientPromise from '../src/lib/db/mongodb'

async function updateData() {
  try {
    const client = await clientPromise
    const db = client.db("wowlink")
    
    // 데이터 추가
    await db.collection('sites').updateOne(
      { id: 15 },  // 찾을 조건
      { 
        $set: {     // 설정할 데이터
          id: 15,
          name: "새로운 사이트",
          description: "설명...",
          icon: "/images/sites/new.png",
          url: "https://example.com",
          category: "guide"
        }
      },
      { upsert: true }  // 없으면 생성
    )

    console.log('데이터 업데이트 완료')
  } catch (e) {
    console.error('Error:', e)
  }
}

updateData()