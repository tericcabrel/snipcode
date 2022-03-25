import BaseLogger from './src/base-logger';
import FileLogger from './src/file-logger';

const baseLogger = new BaseLogger();
const fileLogger = new FileLogger();

export { baseLogger, fileLogger };
