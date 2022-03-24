import dotenv from "dotenv";
import { AppEnvironmentVariables } from "../types/common";

dotenv.config();

const { HOST, PORT, NODE_ENV, ENABLE_INTROSPECTION } = process.env;

export const env: AppEnvironmentVariables = {
  ENABLE_INTROSPECTION: ENABLE_INTROSPECTION === 'true',
  HOST,
  IS_DEV: NODE_ENV !== 'production',
  IS_PROD: NODE_ENV === 'production',
  PORT: parseInt(PORT ?? '7501', 10),
}
