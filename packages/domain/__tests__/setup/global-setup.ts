// This file is executed once in the worker before executing each test file.
import { execSync } from 'child_process';
import * as path from 'path';

import { getEnv } from '@sharingan/utils';
import dotenv from 'dotenv';

dotenv.config();

const databaseUser = 'root';
const databasePassword = getEnv('MYSQL_ROOT_PASSWORD');
const databaseName = getEnv('MYSQL_DATABASE');
const databasePort = getEnv('MYSQL_PORT');
const isRunningLocally = process.env.IS_LOCAL === 'true';

/*
 * This file is executed by Jest before running any tests.
 * We drop the database and re-create it from migrations every time.
 */
export default async () => {
  if (!process.env.TEST_WITH_DB) {
    return;
  }

  const databaseURL = `mysql://${databaseUser}:${databasePassword}@127.0.0.1:${databasePort}/${databaseName}`;

  if (!isRunningLocally) {
    const prismaSchemaPath = `${path.resolve(__dirname, '../../../database/prisma')}/schema.test.prisma`;

    const command = `DATABASE_URL=${databaseURL} npx prisma migrate dev --schema=${prismaSchemaPath}`;

    execSync(command);
  }
};
