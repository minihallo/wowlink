import { getStreamers } from "@/lib/db/getData";
import { Streamer } from "@/types/streamer";
import { ChzzkClient } from "chzzk";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const options = {
    nidAuth: process.env.NID_AUT,
    nidSession: process.env.NID_SES
}

async function updateProfileImages() {
  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in .env file');
  }

  try {
    const client = await connectToMongoDB();

    await updateTwitchProfileImages(client);
    await updateChzzkProfileImages(client);
  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

const updateTwitchProfileImages = async (client: MongoClient) => {
  try {
    // MongoDB 연결
    console.log('Environment check:', {
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
      TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
  });

    const db = client.db("wowlink");
    const streamersCollection = db.collection('streamers');

    const twitchStreamers = await streamersCollection.find({ platform: 'twitch' }).toArray();

    console.log('Found twitch streamers:', twitchStreamers);

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          client_id: process.env.TWITCH_CLIENT_ID!,
          client_secret: process.env.TWITCH_CLIENT_SECRET!,
          grant_type: 'client_credentials'
      })
  });
  
  const data = await response.json();
  const accessToken = data.access_token;

  for (const streamer of twitchStreamers) {
    try {
      // 트위치 API로 유저 정보 가져오기
      const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${streamer.name}`, {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID!,
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const userData = await userResponse.json();
      
      if (userData.data && userData.data[0]) {
        const profileImageUrl = userData.data[0].profile_image_url;
        
        // MongoDB 업데이트
        await streamersCollection.updateOne(
          { name: streamer.name },
          { 
            $set: { 
              profileImageUrl: profileImageUrl,
              lastUpdated: new Date()
            } 
          }
        );

        console.log(`Updated profile image for ${streamer.name}`);
      } else {
        console.log(`No Twitch data found for ${streamer.name}`);
      }
    } catch (error) {
      console.error(`Error updating ${streamer.name}:`, error);
    }
  }

  } catch (error) {
    console.error('Error updating Twitch profile images:', error);
  }
}

const updateChzzkProfileImages = async (client: MongoClient) => {
  try {
    // MongoDB 연결
    const db = client.db("wowlink");
    const streamersCollection = db.collection('streamers');
    
    const chzzkClient = new ChzzkClient(options);

    const chzzkStreamers = await streamersCollection.find({ platform: 'chzzk' }).toArray();
    
    console.log('Found chzzk streamers:', chzzkStreamers);

    // 각 스트리머의 프로필 이미지 업데이트
    for (const streamer of chzzkStreamers) {
      try {
        const searchResult = await chzzkClient.search.channels(streamer.name);
        
        if (searchResult.channels && searchResult.channels[0]) {
          const profileImageUrl = searchResult.channels[0].channelImageUrl;
          
          await streamersCollection.updateOne(
            { name: streamer.name },
            { 
              $set: { 
                profileImageUrl: profileImageUrl,
                lastUpdated: new Date()
              } 
            }
          );

          console.log(`Updated profile image for ${streamer.name}`);
        } else {
          console.log(`No search results found for ${streamer.name}`);
        }
      } catch (error) {
        console.error(`Error updating ${streamer.name}:`, error);
      }
    }

    console.log('Profile image update completed');
    await client.close();

  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

async function connectToMongoDB() {
  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in .env file');
  }
  const client = await MongoClient.connect(MONGODB_URI);
  return client;
}

// 스크립트 실행
updateProfileImages()
  .then(() => {
    console.log('Successfully completed the update process');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to run the update script:', error);
    process.exit(1);
  });