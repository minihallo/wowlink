import * as Sentry from '@sentry/serverless';

export const initSentry = () => {
  Sentry.AWSLambda.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.5,
    environment: process.env.NODE_ENV || 'development',
  });
};

export const wrapHandlerWithSentry = (handler) => {
  return Sentry.AWSLambda.wrapHandler(handler);
}; 