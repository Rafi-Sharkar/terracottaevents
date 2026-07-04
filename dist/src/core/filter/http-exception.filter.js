"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const response_util_1 = require("../../common/utils/response.util");
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let message;
        let errorData = null;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            }
            else if (typeof res === 'object' && res !== null && 'message' in res) {
                const msg = res.message;
                message = Array.isArray(msg) ? msg : String(msg);
                errorData = res;
            }
            else {
                message = 'An error occurred';
            }
        }
        else if (exception instanceof Error) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message || 'Internal server error';
            errorData = {
                name: exception.name,
                ...(process.env.NODE_ENV !== 'production' && {
                    stack: exception.stack,
                }),
            };
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
        }
        const errorPayload = (0, response_util_1.errorResponse)(errorData, message);
        console.error('===============================');
        console.error('Request URL:', request.url);
        console.error('HTTP Status:', status);
        console.error('Error Message:', message);
        console.error('Error Details:', exception);
        console.error('===============================');
        response.status(status).json(errorPayload);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map