import { BLIZZARD_API } from '../endpoints';
import { getBlizzardToken } from "./auth";

export async function getWoWToken() {
    const token = await getBlizzardToken();
    const response = await fetch(
      `${BLIZZARD_API.TOKEN}` + `?namespace=dynamic-kr&locale=ko_KR`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    return data.price / 10000; // 골드 단위로 변환
}