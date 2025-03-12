FROM node:20-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD npm install
ADD . .
ADD npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]