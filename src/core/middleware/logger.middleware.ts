import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor() {
    const logFormat = winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          dirname: 'logs',
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
          dirname: 'logs',
        }),
      ],
    });
  }

  private redactSensitiveFields(
    obj: Record<string, unknown>,
  ): Record<string, unknown> {
    const SENSITIVE_KEYS = [
      'password',
      'newPassword',
      'oldPassword',
      'confirmPassword',
      'token',
      'refreshToken',
      'accessToken',
      'otp',
      'secret',
      'pin',
    ];
    const redacted = { ...obj };
    for (const key of SENSITIVE_KEYS) {
      if (key in redacted) redacted[key] = '[REDACTED]';
    }
    return redacted;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;
    const startTime = Date.now();
    const safeBody =
      body && typeof body === 'object'
        ? this.redactSensitiveFields(body as Record<string, unknown>)
        : body;

    const oldJson = res.json.bind(res);
    const oldSend = res.send.bind(res);

    const logResponse = (responseBody: unknown) => {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      const logMessage = `[${method}] ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`;
      const logDetails = {
        method,
        url: originalUrl,
        statusCode,
        duration,
        body: safeBody,
        query,
        params,
        responseBody: statusCode >= 400 ? responseBody : undefined,
      };

      if (statusCode >= 400) {
        this.logger.error(
          `${logMessage} - Details: ${JSON.stringify(logDetails)}`,
        );
      } else {
        this.logger.info(logMessage);
      }
    };

    res.json = (data: unknown) => {
      logResponse(data);
      return oldJson(data);
    };

    res.send = (data: unknown) => {
      logResponse(data);
      return oldSend(data);
    };

    next();
  }
}
