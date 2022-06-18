FROM node:16-buster as builder

RUN mkdir -p sharingan

WORKDIR /sharingan
COPY . .

RUN yarn install

RUN yarn build --filter=!@sharingan/web


FROM node:16-alpine as schema-builder
WORKDIR /app

COPY --chown=node:node --from=builder /sharingan/packages/database/prisma/schema.prisma ./app/prisma/

RUN npx prisma generate  --schema=./app/prisma/schema.prisma


FROM node:16-alpine AS sharingan

ENV NODE_ENV=production
ARG FROM_APP=/sharingan/apps/core
ARG TO_APP=./apps/core/
ARG FROM_PKG_DATABASE=/sharingan/packages/database
ARG TO_PKG_DATABASE=./packages/database/
ARG FROM_PKG_DOMAIN=/sharingan/packages/domain
ARG TO_PKG_DOMAIN=./packages/domain/
ARG FROM_PKG_LOGGER=/sharingan/packages/logger
ARG TO_PKG_LOGGER=./packages/logger/
ARG FROM_PKG_UTILS=/sharingan/packages/utils
ARG TO_PKG_UTILS=./packages/utils/

WORKDIR /app

COPY --chown=node:node --from=builder $FROM_APP/package.json $TO_APP
COPY --chown=node:node --from=builder $FROM_APP/dist $TO_APP

COPY --chown=node:node --from=builder $FROM_PKG_DATABASE/package.json $FROM_PKG_DATABASE/yarn.lock $TO_PKG_DATABASE
COPY --chown=node:node --from=builder $FROM_PKG_DATABASE/dist $TO_PKG_DATABASE

COPY --chown=node:node --from=builder $FROM_PKG_DOMAIN/package.json $TO_PKG_DOMAIN
COPY --chown=node:node --from=builder $FROM_PKG_DOMAIN/dist $TO_PKG_DOMAIN

COPY --chown=node:node --from=builder $FROM_PKG_LOGGER/package.json $FROM_PKG_LOGGER/yarn.lock $TO_PKG_LOGGER
COPY --chown=node:node --from=builder $FROM_PKG_LOGGER/dist $TO_PKG_LOGGER

COPY --chown=node:node --from=builder $FROM_PKG_UTILS/package.json $TO_PKG_UTILS
COPY --chown=node:node --from=builder $FROM_PKG_UTILS/dist $TO_PKG_UTILS

COPY --chown=node:node --from=builder /sharingan/package.json /sharingan/yarn.lock ./

RUN yarn install --production && chown node:node -R node_modules

COPY --chown=node:node --from=schema-builder /app/node_modules/.prisma ./node_modules/.prisma/

EXPOSE 7501

CMD ["node", "apps/core/src/index.js"]
