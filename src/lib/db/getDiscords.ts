export async function getDiscords() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discords`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch discords')
    }
    return res.json()
}