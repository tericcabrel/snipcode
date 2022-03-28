import path from 'path';
import { fileLogger } from '@sharingan/logger';

fileLogger.init({
  appName: 'core',
  logFileDirectory: path.resolve(__dirname, '../../logs'),
  logToSentry: false,
});

export { fileLogger as logger };
