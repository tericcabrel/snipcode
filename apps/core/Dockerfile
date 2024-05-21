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
RUN npx prisma generate --schema=./app/prisma/schema.prisma


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
COPY --chown=node:node --from=builder /app/packages/domain/node_modules/.prisma ./packages/domain/node_modules/.prisma

COPY --chown=node:node --from=builder /app/packages/utils/package.json ./packages/utils/package.json
COPY --chown=node:node --from=builder /app/packages/utils/dist ./packages/utils/dist

COPY --chown=node:node --from=builder /app/packages/embed/package.json ./packages/embed/package.json
COPY --chown=node:node --from=builder /app/packages/embed/dist ./packages/embed/dist

COPY --chown=node:node --from=builder /app/packages/logger/package.json ./packages/logger/package.json
COPY --chown=node:node --from=builder /app/packages/logger/dist ./packages/logger/dist

# COPY --chown=node:node --from=builder /app/packages/domain/package.json ./node_modules/@snipcode/domain/package.json
# COPY --chown=node:node --from=builder /app/packages/domain/dist ./node_modules/@snipcode/domain/dist
# COPY --chown=node:node --from=builder /app/packages/domain/node_modules/.prisma ./node_modules/@snipcode/domain/node_modules/.prisma


RUN yarn install
# RUN yarn workspaces focus # && yarn cache clean

# COPY --chown=node:node --from=schema-builder /app/node_modules/.prisma/client/schema.prisma ./node_modules/.prisma/client
# COPY --chown=node:node --from=schema-builder /app/node_modules/.prisma/client/libquery_engine-linux-musl.so.node ./node_modules/.prisma/client
# COPY --chown=node:node --from=schema-builder /app/node_modules/@prisma/client ./packages/domain/node_modules/@prisma/client
# COPY --chown=node:node --from=schema-builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# RUN rm -rf ./packages/domain/node_modules/@prisma/client
COPY --chown=node:node --from=schema-builder /app/node_modules/.prisma/client ./packages/domain/node_modules/.prisma/client

EXPOSE 7501

CMD ["node", "apps/core/src/index.js"]
