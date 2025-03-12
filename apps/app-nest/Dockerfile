# Стадия сборки
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json nx.json tsconfig.base.json eslint.config.mjs ./
COPY apps/app-nest/ ./apps/app-nest/
RUN npm install
RUN npx nx build app-nest --prod

# Стадия запуска
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/app-nest ./dist/apps/app-nest
COPY package.json package-lock.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/apps/app-nest/main"]