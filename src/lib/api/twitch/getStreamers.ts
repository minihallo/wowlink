import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Streamer } from '@/types/streamer';

dotenv.config({ path: '.env.local' });

const getTwitchStreamers = async () => {

    try {
        console.log('Environment check:', {
            TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
            TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
         });

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

        const gameResponse = await fetch(
            'https://api.twitch.tv/helix/games?name=World of Warcraft',
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID!,
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );
        const gameData = await gameResponse.json();
        const wowGameId = gameData.data[0].id;

        const streamsResponse = await fetch(
            `https://api.twitch.tv/helix/streams?game_id=18122&first=100`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID!,
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        const streamsData = await streamsResponse.json();

        // 시청자 수로 필터링 (예: 1000명 이상)
        const popularStreams = streamsData.data.filter(
            (stream: any) => stream.viewer_count >= 1000
        );

        console.log('Found popular streams:', popularStreams);

        const userIds = popularStreams.map((stream: any) => stream.user_id).join('&id=');
        const usersResponse = await fetch(
            `https://api.twitch.tv/helix/users?id=${userIds}`,
            {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID!,
                'Authorization': `Bearer ${accessToken}`
            }
            }
        );
        const usersData = await usersResponse.json();

        // 스트림 데이터와 사용자 정보를 결합
        const streamersInfo = popularStreams.map((stream: any) => {
            const userInfo = usersData.data.find((user: any) => user.id === stream.user_id);
            return {
                title: stream.title,
                name: userInfo.login,            // 사용자 로그인 이름
                displayName: userInfo.display_name,  // 표시 이름
                url: `https://www.twitch.tv/${userInfo.login}`,  // 채널 URL
                viewerCount: stream.viewer_count,
                profileImage: userInfo.profile_image_url
            };
        });

        const streamers: Streamer[] = [];

        for (const streamer of streamersInfo) {
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
                    
                    const data = {
                        title: streamer.title,
                        name: streamer.name,
                        url: streamer.url,
                        category: 'global',
                        platform: 'twitch',
                        profileImageUrl: profileImageUrl,
                        isLive: true,
                        viewerCount: streamer.viewerCount
                    };
                    streamers.push(data);
                }
                else {
                    console.log(`No Twitch data found for ${streamer.name}`);
                }
            } catch (error) {
              console.error(`Error updating ${streamer.name}:`, error);
            }
        }

        return streamers as Streamer[];
    } catch (error) {
      console.error('Error getting Twitch streamers:', error);
    }
}

export default getTwitchStreamers;