"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    code;
    message;
    constructor(code = 500, message) {
        super(message);
        this.code = code;
        this.message = message;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
//# sourceMappingURL=handle-error.app.js.map