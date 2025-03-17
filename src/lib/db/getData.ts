// export async function getData<T>(endpoint: string): Promise<T> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
//     cache: 'no-store',
//   })
  
//   if (!res.ok) {
//     throw new Error(`Failed to fetch ${endpoint}`)
//   }
  
//   return res.json()
// }
  
// import { Site } from "@/types/site"
// export const getSites = () => getData<Site[]>('sites')

// import { Discord } from "@/types/discord"
// export const getDiscords = () => getData<Discord[]>('discords')

// import { Streamer } from "@/types/streamer"
// export const getStreamers = () => getData<Streamer[]>('streamers')

// import { Tip } from "@/types/tip"
// export const getTips = () => getData<Tip[]>('tips')


import { connectToDatabase } from './mongodb'
import { cache } from 'react';

// export async function getData<T>(collection: string): Promise<T[]> {
export const getData = cache(async <T>(collection: string): Promise<T[]> => {

  try {
    const { client } = await connectToDatabase();
    const db = client.db("wowlink");
    
    const data = await db
      .collection(collection)
      .find({})
      .toArray();
    
    return JSON.parse(JSON.stringify(data)) as T[];
  } catch (e) {
    console.error(`Failed to fetch from ${collection}:`, e)
    throw new Error(`Failed to fetch from ${collection}`)
  }
});
  
import { Site } from "@/types/site"
export const getSites = () => getData<Site>('sites')

import { Discord } from "@/types/discord"
export const getDiscords = () => getData<Discord>('discords')

import { Streamer } from "@/types/streamer"
export const getStreamers = () => getData<Streamer>('streamers')

import { Tip } from "@/types/tip"
export const getTips = () => getData<Tip>('tips')

import { TokenDocument } from '@/types/token';
export const getTokens = async () => {
  const { unstable_noStore } = await import('next/cache');
  unstable_noStore();
  return getData<TokenDocument>('tokens');
}

// export const getTokens = () => getData<TokenDocument>('tokens')
