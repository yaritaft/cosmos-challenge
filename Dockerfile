# Target: Build
FROM node:16.15.0-alpine3.15

WORKDIR /app

COPY . .

RUN npm install --only=development
RUN npm run build
