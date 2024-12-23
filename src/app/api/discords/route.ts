import { NextResponse } from 'next/server'
import { getDiscords } from '@/lib/db/getData'

export async function GET() {
  try {
    return NextResponse.json(await getDiscords())
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 })
  }
}