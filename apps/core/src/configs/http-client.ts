import axios from 'axios';

import { logger } from './logger';

const httpClient = axios.create();

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const {
      config: { method, url },
      data,
      status,
    } = err.response;

    logger.error({ data, method, status, url });

    throw err;
  },
);

export { httpClient };
