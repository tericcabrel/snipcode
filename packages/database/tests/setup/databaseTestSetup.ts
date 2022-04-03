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
  const container = new MySqlContainer('mysql:8.0');

  runningContainer = await container
    .withExposedPorts(databasePort)
    .withRootPassword(databasePassword)
    .withDatabase(databaseName)
    .start();

  const runningPort = runningContainer.getMappedPort(databasePort);

  const databaseURL = `mysql://${databaseUser}:${databasePassword}@localhost:${runningPort}/${databaseName}`;

  const prismaSchemaPath = `${path.resolve(__dirname, '../../../database/prisma')}/schema.prisma`;

  console.log('URL', databaseURL);
  console.log('Path => ', prismaSchemaPath);

  const command = `DATABASE_URL=${databaseURL} npx prisma migrate dev --schema=${prismaSchemaPath}`;

  //console.log('command => ', command);

  execSync('yarn db:shadow');
  execSync(command);

  global.prisma = new PrismaClient({ datasources: { db: { url: databaseURL } } });
  prismaClient = global.prisma;

  await prismaClient.$connect();

  // await Promise.all(yearGroupsInput.map((input) => yearGroupService.findOrCreate(input)));
});

afterAll(async () => {
  await prismaClient.$disconnect();

  if (runningContainer) {
    console.log('STOPPING CONTAINER....');
    await runningContainer.stop();
  }
});
