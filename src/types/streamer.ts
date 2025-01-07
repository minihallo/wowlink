export interface Streamer {
    title: string;
    name: string;
    url: string;
    category: string;
    platform: string;
    profileImageUrl?: string;
    isLive?: boolean;
    viewerCount?: number;
}