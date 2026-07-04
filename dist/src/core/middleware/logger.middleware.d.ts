import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import 'winston-daily-rotate-file';
export declare class LoggerMiddleware implements NestMiddleware {
    private logger;
    constructor();
    private redactSensitiveFields;
    use(req: Request, res: Response, next: NextFunction): void;
}
