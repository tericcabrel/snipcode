FROM node:16-buster as builder

RUN mkdir app

WORKDIR /app

COPY . .

RUN yarn install

RUN npx prisma generate  --schema=./packages/database/prisma/schema.prisma

WORKDIR /app/apps/core

RUN yarn build:prod

FROM node:16-alpine as schema-builder

WORKDIR /app

COPY --chown=node:node --from=builder /app/packages/database/prisma/schema.prisma ./app/prisma/

# Generate the Prisma query engine for Node Alpine
RUN npx prisma generate --schema=./app/prisma/schema.prisma


FROM node:16-alpine AS sharingan

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node --from=builder /app/apps/core/build/index.js ./
COPY --chown=node:node --from=builder /app/apps/core/build/index.js.map ./
COPY --chown=node:node --from=schema-builder /app/node_modules/.prisma/client/schema.prisma ./
COPY --chown=node:node --from=schema-builder /app/node_modules/.prisma/client/libquery_engine-linux-musl.so.node ./

RUN yarn init -y

EXPOSE 7501

CMD ["node", "--enable-source-maps", "index.js"]
