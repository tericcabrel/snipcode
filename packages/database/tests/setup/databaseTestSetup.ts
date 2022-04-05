// This file is executed once in the worker before executing each test file.
import * as path from 'path';
import { execSync } from 'child_process';
import { MySqlContainer, StartedMySqlContainer } from 'testcontainers';
import dotenv from 'dotenv';
import { getEnv } from '@sharingan/utils';
import { PrismaClient } from '../../index';

jest.setTimeout(60000);

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

let runningContainer: StartedMySqlContainer;
let prismaClient: PrismaClient;

const databaseUser = 'root';
const databasePassword = getEnv('MYSQL_ROOT_PASSWORD');
const databaseName = getEnv('MYSQL_DATABASE');
const databasePort = 3306;

beforeAll(async () => {
  if (!process.env.TEST_WITH_DB) {
    return;
  }

  const container = new MySqlContainer('mysql:8.0');

  runningContainer = await container
    .withExposedPorts(databasePort)
    .withRootPassword(databasePassword)
    .withDatabase(databaseName)
    .start();

  const runningPort = runningContainer.getMappedPort(databasePort);

  const databaseURL = `mysql://${databaseUser}:${databasePassword}@localhost:${runningPort}/${databaseName}`;

  const prismaSchemaPath = `${path.resolve(__dirname, '../../../database/prisma')}/schema.test.prisma`;

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

  if (runningContainer) {
    console.log('STOPPING CONTAINER....');
    await runningContainer.stop();
  }
});
