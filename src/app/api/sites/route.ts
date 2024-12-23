import { NextResponse } from 'next/server'
import { getSites } from '@/lib/db/getData'

export async function GET() {
  try {
    return NextResponse.json(await getSites())
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 })
  }
}