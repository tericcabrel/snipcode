FROM node:16-buster as builder

RUN mkdir -p sharingan

WORKDIR /sharingan
COPY . .

RUN yarn install

RUN yarn build --filter=!@sharingan/web

RUN cd packages/database && yarn db:generate && cd ../..

FROM node:16-alpine AS sharingan
ENV NODE_ENV=production
WORKDIR /app

COPY --chown=node:node --from=builder /sharingan/apps/core/package.json ./apps/core/
COPY --chown=node:node --from=builder /sharingan/apps/core/dist ./apps/core/

COPY --chown=node:node --from=builder /sharingan/packages/database/package.json /sharingan/packages/database/yarn.lock ./packages/database/
COPY --chown=node:node --from=builder /sharingan/packages/database/dist ./packages/database/

COPY --chown=node:node --from=builder /sharingan/packages/domain/package.json ./packages/domain/
COPY --chown=node:node --from=builder /sharingan/packages/domain/dist ./packages/domain/

COPY --chown=node:node --from=builder /sharingan/packages/logger/package.json /sharingan/packages/logger/yarn.lock ./packages/logger/
COPY --chown=node:node --from=builder /sharingan/packages/logger/dist ./packages/logger/

COPY --chown=node:node --from=builder /sharingan/packages/utils/package.json ./packages/utils/
COPY --chown=node:node --from=builder /sharingan/packages/utils/dist ./packages/utils/

COPY --chown=node:node --from=builder /sharingan/package.json /sharingan/yarn.lock ./

RUN yarn install --production && chown node:node -R node_modules

EXPOSE 7501

CMD ["node", "apps/core/src/index.js"]
