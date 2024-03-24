import { handlerPath } from '@/libs/handler-resolver';

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
};
