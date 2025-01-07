'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Streamer } from '@/types/streamer';

import Image from "next/image";
import { ChzzkClient } from 'chzzk';
import axios from 'axios';

interface StreamerGridProps {
  streamers: Streamer[];
  twitchClientId: string;
  twitchClientSecret: string;
  chzzkAuth: string;
  chzzkSession: string;
}

const categoryMapping: { [key: string]: string }  = {
  korean: '한국',
  global: '해외'
};

const StreamerGrid = ({ streamers, twitchClientId, twitchClientSecret, chzzkAuth, chzzkSession }: StreamerGridProps) => {
  const [liveStatus, setLiveStatus] = useState<Record<string, boolean>>({});
  const [accessToken, setAccessToken] = useState<string>('');
  
  useEffect(() => {
    checkChzzkLiveStatus();
    // 1분마다 상태 업데이트
    const interval = setInterval(checkChzzkLiveStatus, 180000);
    return () => clearInterval(interval);
  }, [streamers]);


  const checkChzzkLiveStatus = async () => {
    try {
      const chzzkStreamers = streamers.filter(s => s.platform === 'chzzk');
      
      const results = await Promise.all(
        chzzkStreamers.map(async (streamer) => {
          const response = await fetch(`/api/chzzk-status?username=${streamer.name}`);
          const data = await response.json();
          return {
            name: streamer.name,
            isLive: data.isLive
          };
        })
      );
  
      const newLiveStatus: Record<string, boolean> = {};
      results.forEach(result => {
        newLiveStatus[result.name] = result.isLive;
      });
  
      setLiveStatus(prev => ({ ...prev, ...newLiveStatus }));
    } catch (error) {
      console.error('Error checking Chzzk live status:', error);
    }
  };

  // const checkChzzkLiveStatus = async () => {
  //   try {
  //     const chzzkStreamers = streamers.filter(s => s.platform === 'chzzk');
      
  //     const results = await Promise.all(
  //       chzzkStreamers.map(async (streamer) => {
  //         const response = await fetch(`/api/chzzk-status?username=${streamer.name}`);
  //         const data = await response.json();
  //         return {
  //           name: streamer.name,
  //           isLive: data.isLive
  //         };
  //       })
  //     );
  
  //     const newLiveStatus: Record<string, boolean> = {};
  //     results.forEach(result => {
  //       newLiveStatus[result.name] = result.isLive;
  //     });
  
  //     setLiveStatus(prev => ({ ...prev, ...newLiveStatus }));
  //   } catch (error) {
  //     console.error('Error checking Chzzk live status:', error);
  //   }
  // };

  useEffect(() => {
    const initTwitch = async () => {
      const token = await getTwitchToken();
      if (token) setAccessToken(token);
    };
    initTwitch();
  }, []);

  useEffect(() => {
    if (accessToken) {
      checkTwitchLiveStatus();
      // 1분마다 상태 업데이트
      const interval = setInterval(checkTwitchLiveStatus, 180000);
      return () => clearInterval(interval);
    }
  }, [accessToken, streamers]);

  const getTwitchToken = async () => {
    try {
      const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: twitchClientId,
          client_secret: twitchClientSecret,
          grant_type: 'client_credentials'
        })
      });
      
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting Twitch token:', error);
      return null;
    }
  };

  const checkTwitchLiveStatus = async () => {
    if (!accessToken) return;

    const twitchStreamers = streamers.filter(s => s.platform === 'twitch');
    
    try {
      const userLogins = twitchStreamers.map(s => s.name).join('&user_login=');
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${userLogins}`,
        {
          headers: {
            'Client-ID': twitchClientId,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      const data = await response.json();
      
      // 현재 라이브 중인 스트리머 목록 업데이트
      const newLiveStatus: Record<string, boolean> = {};
      twitchStreamers.forEach(streamer => {
        newLiveStatus[streamer.name] = data.data.some(
          (stream: any) => stream.user_login.toLowerCase() === streamer.name.toLowerCase()
        );
      });
      
      setLiveStatus(prev => ({
        ...prev,
        ...newLiveStatus
      }));
    } catch (error) {
      console.error('Error checking live status:', error);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(streamers.map(streamer => streamer.category)));

  const filteredStreamers = streamers.filter(streamer => 
    !selectedCategory || streamer.category === selectedCategory
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="text-sm"
        >
          전체
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className="text-sm"
          >
            {categoryMapping[category] || category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredStreamers.map((streamer) => (
          <Card key={streamer.name} className="hover:bg-accent">
            <Link href={streamer.url} target="_blank" className="block h-full">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={streamer.profileImageUrl || '/images/assets/wowtoken.png'}
                      alt={`${streamer.name} profile`}
                      style={{ maxWidth: '40px', maxHeight: '40px' }}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <CardTitle className="text-base mr-2">{streamer.name}</CardTitle>
                    <Circle 
                      className={`h-3 w-3 ${
                        liveStatus[streamer.name] ? 'fill-red-500 text-red-500' : 'fill-gray-500 text-gray-500'
                      }`}
                    />
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StreamerGrid;