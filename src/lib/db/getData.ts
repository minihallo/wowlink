export async function getData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`)
  }
  
  return res.json()
}
  
import { Site } from "@/types/site"
export const getSites = () => getData<Site[]>('sites')

import { Discord } from "@/types/discord"
export const getDiscords = () => getData<Discord[]>('discords')

import { Streamer } from "@/types/streamer"
export const getStreamers = () => getData<Streamer[]>('streamers')

import { Tip } from "@/types/tip"
export const getTips = () => getData<Tip[]>('tips')

// import clientPromise from './mongodb'

// export async function getData<T>(collection: string): Promise<T[]> {
//   try {
//     const client = await clientPromise;
//     const db = client.db("wowlink");
    
//     const data = await db
//       .collection(collection)
//       .find({})
//       .toArray();
    
//     return JSON.parse(JSON.stringify(data)) as T[];
//   } catch (e) {
//     console.error(`Failed to fetch from ${collection}:`, e)
//     throw new Error(`Failed to fetch from ${collection}`)
//   }
// }

// import { Site } from "@/types/site"
// export const getSites = () => getData<Site>('sites')

// import { Discord } from "@/types/discord"
// export const getDiscords = () => getData<Discord>('discords')

// import { Streamer } from "@/types/streamer"
// export const getStreamers = () => getData<Streamer>('streamers')

// import { Tip } from "@/types/tip"
// export const getTips = () => getData<Tip>('tips')