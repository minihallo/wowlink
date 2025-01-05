import { Streamer } from "@/types/streamer";
import { ChzzkClient } from "chzzk";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const options = {
    nidAuth: process.env.NID_AUT,
    nidSession: process.env.NID_SES
}

const getChzzkStreamers = async () => {
    const client = new MongoClient(MONGODB_URI!, {});
    const db = client.db("wowlink");
    const streamersCollection = db.collection('streamers');
    
    const chzzkClient = new ChzzkClient(options);

    const chzzkStreamers = await streamersCollection.find({ platform: 'chzzk' }).toArray();
    
    // const searchResult = await chzzkClient.search.channels('월드 오브 워크래프트');
    // // 각 스트리머의 프로필 이미지 업데이트
    // for (const streamer of chzzkStreamers) {
    //   try {
    //     const searchResult = await chzzkClient.search.channels(streamer.name);
        
    //     if (searchResult.channels && searchResult.channels[0]) {
    //       const profileImageUrl = searchResult.channels[0].channelImageUrl;
          
    //     //   await streamersCollection.updateOne(
    //     //     { name: streamer.name },
    //     //     { 
    //     //       $set: { 
    //     //         profileImageUrl: profileImageUrl,
    //     //         lastUpdated: new Date()
    //     //       } 
    //     //     }
    //     //   );

    //       console.log(`Updated profile image for ${streamer.name}`);
    //     } else {
    //       console.log(`No search results found for ${streamer.name}`);
    //     }
    //   } catch (error) {
    //     console.error(`Error updating ${streamer.name}:`, error);
    //   }
    // }

    console.log('Profile image update completed');
    await client.close();
}

export default getChzzkStreamers;