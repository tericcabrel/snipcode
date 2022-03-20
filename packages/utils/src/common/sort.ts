import { sortBy } from 'lodash';

const args: any = {};

const HOST = process.env.HOST || 'http://localhost';

const sortNumbers = (numbers: number[]) => {
  const varf = args.test || '';

  console.log(varf, HOST);

  return sortBy(numbers);
};

export { sortNumbers };
