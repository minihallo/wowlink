# 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 파일 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 디버깅을 위한 환경 변수 설정
ENV NODE_OPTIONS="--inspect=0.0.0.0:9229"

EXPOSE 3000 9229
CMD ["npm", "run", "dev"]

# 프로덕션 빌드
RUN yarn build

# 실행 스테이지
FROM node:20-alpine AS runner

WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV production

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 서버 실행
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 