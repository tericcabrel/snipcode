import type { AWS } from '@serverless/typescript';

import { handlerPath } from '@/libs/handler-resolver';

type LambdaEventHandler = Pick<AWS['functions'][number], 'events' | 'handler'>;

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
} as LambdaEventHandler;
