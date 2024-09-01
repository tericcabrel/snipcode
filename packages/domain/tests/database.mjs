#!/usr/bin/env zx

import mysql from 'mysql2/promise';
import { $, sleep } from 'zx';

const CONTAINER_NAME = 'snipcode-test-db';
const MYSQL_HOST = '127.0.0.1';
const MYSQL_PORT = '3313';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = 'secret';
const MYSQL_DATABASE = 'snipcode';

const waitForMysql = async () => {
  console.log('Waiting for database availability...');

  while (true) {
    try {
      const connection = await mysql.createConnection({
        database: MYSQL_DATABASE,
        host: MYSQL_HOST,
        password: MYSQL_PASSWORD,
        port: MYSQL_PORT,
        user: MYSQL_USER,
      });

      await connection.end();

      console.log('The database is ready!!!');
      break;
    } catch (error) {
      await sleep(1000);
    }
  }
};

try {
  await $`docker ps | grep ${CONTAINER_NAME}`;
} catch (error) {
  console.log('Database container not found, creating...');

  await $`docker run -d --rm --name ${CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=${MYSQL_PASSWORD} -e MYSQL_DATABASE=${MYSQL_DATABASE} -p ${MYSQL_PORT}:3306 mysql:8.0.39`;

  await waitForMysql();

  process.env.DATABASE_URL = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`;

  console.log('Applying database migrations...');

  await $`yarn prisma migrate dev`;
}
