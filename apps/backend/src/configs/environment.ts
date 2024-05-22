import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT ?? '7501', 10),
}));

const EnvironmentVariablesSchema = z.object({
  HOST: z.string(),
  NODE_ENV: z.union([z.literal('development'), z.literal('production'), z.literal('test')]),
  PORT: z.number({ coerce: true }).min(7000).max(8000),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
  const result = EnvironmentVariablesSchema.safeParse(config);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format(), null, 2));
  }

  return result.data;
};
