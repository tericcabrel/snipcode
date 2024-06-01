import { INestApplication } from '@nestjs/common';

import { setupAppServer } from '../../server';

export type TestServer = {
  app: INestApplication;
  close: () => Promise<void>;
};

export const startTestServer = async (): Promise<TestServer> => {
  const app = await setupAppServer({ logger: false });

  await app.listen(7501);

  return {
    app,
    close: async () => {
      await app.close();
    },
  };
};
