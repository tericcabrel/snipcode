#!/usr/bin/env zx

import { $, sleep } from 'zx';

const MYSQL_DATABASE = 'snipcode';
const CONTAINER_NAME = 'snipcode-test-db';

if (!process.env.CI) {
    console.log('Create the test database if necessary');

    try {
        await $`docker ps | grep ${CONTAINER_NAME}`;
    } catch (error) {
        // Container not found, creating a new one.
        await $`docker run -d --rm --name ${CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=${MYSQL_DATABASE} -p 3313:3306 mysql:8.0.34`;

        await sleep(10000); // Wait for 9 seconds the container to initialize
    }

    process.env.DATABASE_URL = `mysql://root:secret@127.0.0.1:3313/${MYSQL_DATABASE}`;

    // Reset database and apply all migrations
    await $`yarn prisma migrate reset --force`;
}

