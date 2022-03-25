import fs from 'fs';
import WinstonFileRotation from 'winston-daily-rotate-file';
import { FileLoggerInitOptions } from './types';
import BaseLogger from './base-logger';

class FileLogger extends BaseLogger {
  public init(options: FileLoggerInitOptions) {
    super.init(options);

    if (!fs.existsSync(options.logFileDirectory)) {
      fs.mkdirSync(options.logFileDirectory);
    }

    const transport = new WinstonFileRotation({
      datePattern: 'YYYY-MM-DD',
      dirname: options.logFileDirectory,
      filename: `${options.appName}-%DATE%.log`,
      maxFiles: '14d',
      maxSize: '20m',
      zippedArchive: true,
    });

    this.logger.add(transport);
  }
}

export default FileLogger;
