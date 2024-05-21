FROM node:20-buster as builder

RUN mkdir app

WORKDIR /app

COPY . .

RUN corepack enable && yarn set version berry

RUN yarn install

RUN npx prisma generate  --schema=./packages/domain/prisma/schema.prisma

RUN yarn build --filter=...@snipcode/core


FROM node:20-alpine as schema-builder

WORKDIR /app

COPY --chown=node:node --from=builder /app/packages/domain/prisma/schema.prisma ./app/prisma/

# Generate the Prisma query engine for Node Alpine
RUN npx prisma generate --schema=./app/prisma/schema.prisma && \
    rm ./node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node
# https://www.prisma.io/docs/orm/reference/prisma-schema-reference#binarytargets-options

FROM node:20-alpine AS runner

ARG APP_VERSION="1.0.0"

ENV NODE_ENV=production
ENV APP_VERSION=${APP_VERSION}

WORKDIR /app

RUN corepack enable && yarn set version berry

COPY --chown=node:node --from=builder /app/package.json .
COPY --chown=node:node --from=builder /app/.yarnrc.yml .

COPY --chown=node:node --from=builder /app/apps/core/dist/src ./apps/core/src
COPY --chown=node:node --from=builder /app/apps/core/package.json ./apps/core

COPY --chown=node:node --from=builder /app/packages/domain/package.json ./packages/domain/package.json
COPY --chown=node:node --from=builder /app/packages/domain/dist ./packages/domain/dist

COPY --chown=node:node --from=builder /app/packages/utils/package.json ./packages/utils/package.json
COPY --chown=node:node --from=builder /app/packages/utils/dist ./packages/utils/dist

COPY --chown=node:node --from=builder /app/packages/embed/package.json ./packages/embed/package.json
COPY --chown=node:node --from=builder /app/packages/embed/dist ./packages/embed/dist

COPY --chown=node:node --from=builder /app/packages/logger/package.json ./packages/logger/package.json
COPY --chown=node:node --from=builder /app/packages/logger/dist ./packages/logger/dist

RUN yarn workspaces focus --all --production && yarn cache clean --all

COPY --chown=node:node --from=schema-builder  /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 7501

CMD ["node", "apps/core/src/index.js"]
