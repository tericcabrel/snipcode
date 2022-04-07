// This file is executed once in the worker before executing each test file.
import * as path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { getEnv } from '@sharingan/utils';

jest.setTimeout(10000);
dotenv.config();

const databaseUser = 'root';
const databasePassword = getEnv('MYSQL_ROOT_PASSWORD');
const databaseName = getEnv('MYSQL_DATABASE');
const databasePort = getEnv('MYSQL_PORT');
const isRunningLocally = process.env.IS_LOCAL === 'true';

beforeAll(async () => {
  console.log('Testing ');
  if (!process.env.TEST_WITH_DB) {
    return;
  }

  const databaseURL = `mysql://${databaseUser}:${databasePassword}@localhost:${databasePort}/${databaseName}`;

  if (!isRunningLocally) {
    const prismaSchemaPath = `${path.resolve(__dirname, '../../../database/prisma')}/schema.test.prisma`;

    const command = `DATABASE_URL=${databaseURL} npx prisma migrate dev --schema=${prismaSchemaPath}`;

    execSync(command);
  }
});

afterAll(async () => {
  if (!process.env.TEST_WITH_DB) {
    return;
  }
});
