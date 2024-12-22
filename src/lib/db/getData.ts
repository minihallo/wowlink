export async function getData<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}`)
    }
    
    return res.json()
  }
  
  import { Site } from "@/types/site"
  export const getSites = () => getData<Site[]>('sites')
  
  import { Discord } from "@/types/discord"
  export const getDiscords = () => getData<Discord[]>('discords')