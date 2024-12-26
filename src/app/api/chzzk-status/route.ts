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
    const response = await client.search.channels(username);
    return NextResponse.json({
      isLive: response.channels[0]?.openLive || false
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}