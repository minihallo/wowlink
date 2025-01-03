import { getWoWToken } from "@/lib/api/blizzard";
import { connectToDatabase } from "@/lib/db/mongodb";

interface TokenPrice {
  price: number;
  timestamp: Date;
}

export async function GET() {
  try {
    const tokenPrice = await getWoWToken();
    const { db } = await connectToDatabase();
    
    // const additionalData = [
    //   { price: 175593, timestamp: new Date('2025-01-03T01:00:00Z') },  // KST 10:00
    //   { price: 173634, timestamp: new Date('2025-01-02T01:00:00Z') },
    //   { price: 165515, timestamp: new Date('2025-01-01T01:00:00Z') },
    //   { price: 180670, timestamp: new Date('2024-12-31T01:00:00Z') },
    //   { price: 167583, timestamp: new Date('2024-12-29T01:00:00Z') },
    //   { price: 167429, timestamp: new Date('2024-12-28T01:00:00Z') },
    //   { price: 177288, timestamp: new Date('2024-12-27T01:00:00Z') },
    // ];
    
    // await db.collection<{ kr: TokenPrice[] }>('tokens').updateOne(
    //   {}, // 첫 번째 문서 선택
    //   { 
    //     $push: { 
    //       kr: { $each: additionalData } 
    //     }
    //   },
    //   { upsert: true }
    // );
   
    const timestamp = new Date();
    
    await db.collection<{ kr: TokenPrice[] }>('tokens').updateOne(
      {},
      {
        $push: {
          kr: {
            price: tokenPrice,
            timestamp: timestamp
          }
        }
      },
      { upsert: true }
    );

    return Response.json({ success: true, price: tokenPrice });
  } catch (error) {
    console.error('Token update failed:', error);
    return Response.json({ success: false, error: 'Failed to update token price' }, { status: 500 });
  }
}