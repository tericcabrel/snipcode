import { z } from 'zod';

const EnvironmentVariablesSchema = z.object({
  APP_VERSION: z.string(),
  CONVERTKIT_API_KEY: z.string(),
  CONVERTKIT_FORM_ID: z.string(),
  CONVERTKIT_TAG_ID: z.string(),
  DATABASE_URL: z.string(),
  HOST: z.string(),
  INTROSPECTION_ENABLED: z.boolean({ coerce: true }),
  NODE_ENV: z.union([z.literal('development'), z.literal('production'), z.literal('test')]),
  PORT: z.number({ coerce: true }).min(7000).max(8000),
  SENTRY_DSN: z.string(),
  SENTRY_ENABLED: z.boolean({ coerce: true }),
  SESSION_LIFETIME: z.number({ coerce: true }).min(1),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
  const result = EnvironmentVariablesSchema.safeParse(config);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format(), null, 2));
  }

  return result.data;
};
