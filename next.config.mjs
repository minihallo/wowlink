import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'nng-phinf.pstatic.net', // 치지직 이미지 도메인 추가
            'static-cdn.jtvnw.net', // 트위치 이미지
        ], 
    },
};

// Sentry 옵션
const sentryWebpackPluginOptions = {
  silent: true, // 빌드 로그에서 Sentry 출력 조용히
  org: "minihialla",
  project: "wowlink",
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

// Sentry와 함께 내보내기
export default withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions
);
