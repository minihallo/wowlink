import { Site } from "@/types/site"

export async function getSites(): Promise<Site[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch sites')
    }
    return res.json()
}