import type { AWS } from '@serverless/typescript';

import { handlerPath } from '@/libs/handler-resolver';

type LambdaEventHandler = Pick<AWS['functions'][number], 'events' | 'handler' | 'layers'>;

export default {
  events: [
    {
      http: {
        method: 'get',
        path: 'snippets/{id+}',
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
  handler: `${handlerPath(__dirname)}/handler.main`,
  layers: [
    {
      Ref: 'PrismaLambdaLayer',
    },
    {
      Ref: 'ShikiLambdaLayer',
    },
  ],
} as LambdaEventHandler;
