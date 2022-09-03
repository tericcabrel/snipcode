#!/usr/bin/env bash

rm -rf layers

mkdir -p layers
mkdir -p layers/prisma-layer/nodejs/node_modules/@prisma
mkdir -p layers/shiki-layer/nodejs/node_modules

cd ../../..

yarn workspace @sharingan/database db:generate

cp -r node_modules/.prisma apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules

if [ $1 = "remote" ]; then
    rm apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules/.prisma/client/libquery_engine-darwin.dylib.node
    rm apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules/.prisma/client/libquery_engine-linux-musl.so.node
else
  echo 'local'
fi

cp -r node_modules/@prisma/client apps/functions/code-embed/layers/prisma-layer/nodejs/node_modules/@prisma

cp -r node_modules/shiki apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
cp -r node_modules/vscode-oniguruma apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
cp -r node_modules/vscode-textmate apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
cp -r node_modules/jsonc-parser apps/functions/code-embed/layers/shiki-layer/nodejs/node_modules
