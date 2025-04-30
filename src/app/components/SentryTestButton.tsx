'use client';

import * as Sentry from '@sentry/nextjs';

export default function SentryTestButton() {
  const testSentry = () => {
    try {
      throw new Error("테스트 에러입니다!");
    } catch (error) {
      Sentry.captureException(error);
      alert("에러가 발생했고 Sentry에 기록되었습니다.");
    }
  };

  return (
    <button 
      onClick={testSentry}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Sentry 테스트
    </button>
  );
} 