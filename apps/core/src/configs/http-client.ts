import axios from 'axios';

import { logger } from './logger';

const client = axios.create();

client.interceptors.response.use(
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

export default client;
