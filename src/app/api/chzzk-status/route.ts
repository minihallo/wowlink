import { ChzzkClient } from 'chzzk';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || '';

  const client = new ChzzkClient({
    nidAuth: process.env.NID_AUT,
    nidSession: process.env.NID_SES
  });

  try {
    // 타임아웃 설정
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 5000)
    );

    const searchPromise = client.search.channels(username);
    const response: any = await Promise.race([searchPromise, timeoutPromise]);

    if (!response?.channels?.length) {
      return NextResponse.json({ isLive: false });
    }

    return NextResponse.json({
      isLive: response.channels[0].openLive || false
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}