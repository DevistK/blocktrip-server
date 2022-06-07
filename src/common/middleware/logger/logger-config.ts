import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { format, Logform, transports } from 'winston';
import 'winston-daily-rotate-file';

export class LoggerConfig {
  static createApplicationLogger() {
    return WinstonModule.createLogger({
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('BlockTrip'),
      ),
      transports: [
        new transports.Console({}),
        new transports.DailyRotateFile({
          format: this.logFileFormat(),
          filename: 'application-%DATE%.log',
          dirname: 'logs',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new transports.DailyRotateFile({
          format: this.logFileFormat(),
          level: 'error',
          filename: 'error-%DATE%.log',
          dirname: 'logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  private static logFileFormat(): Logform.Format {
    return format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf((info) => JSON.stringify(info)),
    );
  }
}
