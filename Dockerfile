FROM node:20-alpine AS base

FROM base as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base as runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV development

EXPOSE $PORT
