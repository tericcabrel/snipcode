export type EnhancedLogger = {
  error: (output: unknown, logToSentry?: boolean) => void;
  info: (output: unknown) => void;
};

export type LoggerInitOptions = {
  sentry: {
    dsn: string;
    enabled: boolean;
    environment: string;
  };
  silent?: boolean;
};

export type FileLoggerInitOptions = LoggerInitOptions & {
  appName: string;
  logFileDirectory: string;
};
