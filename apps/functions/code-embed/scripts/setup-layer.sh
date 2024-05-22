#!/usr/bin/env bash

rm -rf layers

mkdir -p layers
mkdir -p layers/prisma-layer/nodejs/node_modules/@prisma
mkdir -p layers/shiki-layer/nodejs/node_modules

cd ../../..

yarn workspace @snipcode/domain db:generate

cp -r node_modules/.prisma apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules

PRISMA_ENGINE_MACOS=apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules/.prisma/client/libquery_engine-darwin.dylib.node
PRISMA_ENGINE_DOCKER_LINUX=apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules/.prisma/client/libquery_engine-linux-musl.so.node

if [ $1 = "remote" ]; then
  if [ -f "$PRISMA_ENGINE_MACOS" ]; then
      rm $PRISMA_ENGINE_MACOS
  fi
  if [ -f "$PRISMA_ENGINE_DOCKER_LINUX" ]; then
      rm $PRISMA_ENGINE_DOCKER_LINUX
  fi
else
  echo 'local'
fi

cp -r node_modules/@prisma/client apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules/@prisma

cp -r node_modules/shiki apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
cp -r node_modules/vscode-oniguruma apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
cp -r node_modules/vscode-textmate apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
cp -r node_modules/jsonc-parser apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
