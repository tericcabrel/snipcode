import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('app', () => ({
  databaseUrl: process.env.DATABASE_URL,
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT ?? '7501', 10),
  sentry: {
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.SENTRY_ENABLED,
  },
  version: process.env.APP_VERSION,
}));

const EnvironmentVariablesSchema = z.object({
  APP_VERSION: z.string(),
  DATABASE_URL: z.string(),
  HOST: z.string(),
  NODE_ENV: z.union([z.literal('development'), z.literal('production'), z.literal('test')]),
  PORT: z.number({ coerce: true }).min(7000).max(8000),
  SENTRY_DSN: z.string(),
  SENTRY_ENABLED: z.boolean({ coerce: true }),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
  const result = EnvironmentVariablesSchema.safeParse(config);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format(), null, 2));
  }

  return result.data;
};
