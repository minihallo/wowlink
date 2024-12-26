/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'nng-phinf.pstatic.net', // 치지직 이미지 도메인 추가
            'static-cdn.jtvnw.net', // 트위치 이미지
        ], 
    },
};

export default nextConfig;
