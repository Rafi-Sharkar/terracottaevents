"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const winston = __importStar(require("winston"));
require("winston-daily-rotate-file");
let LoggerMiddleware = class LoggerMiddleware {
    logger;
    constructor() {
        const logFormat = winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
        });
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
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
    redactSensitiveFields(obj) {
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
            if (key in redacted)
                redacted[key] = '[REDACTED]';
        }
        return redacted;
    }
    use(req, res, next) {
        const { method, originalUrl, body, query, params } = req;
        const startTime = Date.now();
        const safeBody = body && typeof body === 'object'
            ? this.redactSensitiveFields(body)
            : body;
        const oldJson = res.json.bind(res);
        const oldSend = res.send.bind(res);
        const logResponse = (responseBody) => {
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
                this.logger.error(`${logMessage} - Details: ${JSON.stringify(logDetails)}`);
            }
            else {
                this.logger.info(logMessage);
            }
        };
        res.json = (data) => {
            logResponse(data);
            return oldJson(data);
        };
        res.send = (data) => {
            logResponse(data);
            return oldSend(data);
        };
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map