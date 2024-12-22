import { BLIZZARD_API } from '../endpoints';

export async function getBlizzardToken() {
    const response = await fetch(`${BLIZZARD_API.AUTH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${process.env.BLIZZARD_CLIENT_ID}&client_secret=${process.env.BLIZZARD_CLIENT_SECRET}`,
    });
  
    const data = await response.json();
    return data.access_token;
}