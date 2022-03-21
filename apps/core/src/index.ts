import express from 'express';
import dotenv from 'dotenv';
import { sortNumbers } from '@sharingan/utils';

dotenv.config();

const { HOST, PORT } = process.env;
const SERVER_PORT = parseInt(PORT ?? '7501');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(SERVER_PORT, () => {
  console.log(sortNumbers([67, 80, 4, 11, 90, 54, 22]));

  console.log(`Application started on URL ${HOST}:${SERVER_PORT} 🎉`);
});
