import { z } from 'zod';

const EnvironmentVariablesSchema = z.object({
  ADMIN_PASSWORD: z.string(),
  APP_VERSION: z.string(),
  CONVERTKIT_API_KEY: z.string(),
  CONVERTKIT_FORM_ID: z.string(),
  CONVERTKIT_TAG_ID: z.string(),
  DATABASE_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  HOST: z.string(),
  INTROSPECTION_ENABLED: z.boolean({ coerce: true }),
  NODE_ENV: z.union([z.literal('development'), z.literal('production'), z.literal('test')]),
  PORT: z.number({ coerce: true }).min(7000).max(8000),
  SENTRY_DSN: z.string(),
  SENTRY_ENABLED: z.boolean({ coerce: true }),
  SESSION_LIFETIME: z.number({ coerce: true }).min(1),
  SNIPPET_RENDERER_API_URL: z.string(),
  WEB_APP_URL: z.string(),
  WEB_AUTH_ERROR_URL: z.string(),
  WEB_AUTH_SUCCESS_URL: z.string(),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
  const result = EnvironmentVariablesSchema.safeParse(config);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format(), null, 2));
  }

  return result.data;
};
