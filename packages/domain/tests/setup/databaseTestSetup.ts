// This file is executed once in the worker before executing each test file.
import * as path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { getEnv } from '@sharingan/utils';
import { PrismaClient } from '@sharingan/database';

jest.setTimeout(10000);

dotenv.config();

let prismaClient: PrismaClient;

const databaseUser = 'root';
const databasePassword = getEnv('MYSQL_ROOT_PASSWORD');
const databaseName = getEnv('MYSQL_DATABASE');
const databasePort = getEnv('MYSQL_PORT');

beforeAll(async () => {
  if (!process.env.TEST_WITH_DB) {
    return;
  }

  const databaseURL = `mysql://${databaseUser}:${databasePassword}@localhost:${databasePort}/${databaseName}`;

  const prismaSchemaPath = `${path.resolve(__dirname, '../../../database/prisma')}/schema.test.prisma`;

  console.log('Path => ', prismaSchemaPath);

  const command = `DATABASE_URL=${databaseURL} npx prisma migrate dev --schema=${prismaSchemaPath}`;

  execSync(command);

  global.prisma = new PrismaClient({ datasources: { db: { url: databaseURL } } });
  prismaClient = global.prisma;

  await prismaClient.$connect();
});

afterAll(async () => {
  if (!process.env.TEST_WITH_DB) {
    return;
  }

  await prismaClient.$disconnect();
});
