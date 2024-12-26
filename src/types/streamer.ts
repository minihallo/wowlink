export interface Streamer {
    name: string;
    url: string;
    category: string;
    platform: string;
    profileImageUrl?: string;
    isLive?: boolean;
}