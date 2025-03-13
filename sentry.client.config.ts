import * as Sentry from '@sentry/nextjs';
import { browserTracingIntegration } from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // 개발 환경에서는 추적 비율 높게, 프로덕션에서는 낮추세요
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.5 : 1.0,
  // 성능 모니터링 통합 (수정됨)
  integrations: [browserTracingIntegration()],
  // 세션 리플레이 (선택 사항)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
}); 