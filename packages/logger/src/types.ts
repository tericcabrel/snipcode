export type EnhancedLogger = {
  error: (output: unknown, logToSentry?: boolean) => void;
  info: (output: unknown) => void;
};

export type LoggerInitOptions = {
  logToSentry?: boolean;
  sentryDsn?: string;
  silent?: boolean;
};

export type FileLoggerInitOptions = LoggerInitOptions & {
  appName: string;
  logFileDirectory: string;
};
