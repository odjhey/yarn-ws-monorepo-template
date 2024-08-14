FROM node:20-alpine as build

WORKDIR /monorepo

COPY package.json yarn.lock ./
COPY .yarnrc.yml .yarnrc.yml

RUN corepack enable
RUN yarn

COPY packages packages
RUN yarn
RUN yarn workspace @repo/cross-concerns tsc --build

COPY apps apps
RUN yarn
RUN yarn workspace @repo/console tsc --build



CMD ["yarn", "workspace", "@repo/console", "start"]
