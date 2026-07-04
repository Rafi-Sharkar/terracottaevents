"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthThrottlerGuard = exports.THROTTLE_CONFIG_KEY = exports.THROTTLE_SKIP_KEY = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
exports.THROTTLE_SKIP_KEY = 'throttle_skip';
exports.THROTTLE_CONFIG_KEY = 'throttle_config';
let AuthThrottlerGuard = class AuthThrottlerGuard extends throttler_1.ThrottlerGuard {
    options;
    storageService;
    reflector;
    constructor(options, storageService, reflector) {
        super(options, storageService, reflector);
        this.options = options;
        this.storageService = storageService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const skipThrottle = this.reflector.getAllAndOverride(exports.THROTTLE_SKIP_KEY, [context.getHandler(), context.getClass()]);
        if (skipThrottle) {
            return true;
        }
        const customConfig = this.reflector.getAllAndOverride(exports.THROTTLE_CONFIG_KEY, [context.getHandler(), context.getClass()]);
        try {
            if (customConfig) {
                return await this.handleCustomThrottle(context, customConfig);
            }
            return await super.canActivate(context);
        }
        catch (error) {
            if (error instanceof throttler_1.ThrottlerException) {
                const request = context.switchToHttp().getRequest();
                const ttl = customConfig?.ttl || 60000;
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
                    message: 'Too many requests',
                    error: 'Too Many Requests',
                    retryAfter: Math.ceil(ttl / 1000),
                    details: error.message,
                }, common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw error;
        }
    }
    async handleCustomThrottle(context, config) {
        const request = context.switchToHttp().getRequest();
        const key = this.generateCustomKey(context, request, config);
        const { totalHits } = await this.storageService.increment(key, config.ttl, config.limit, config.blockDuration || config.ttl, 'default');
        if (totalHits > config.limit) {
            throw new throttler_1.ThrottlerException(`Rate limit exceeded. Please try again in ${Math.ceil(config.ttl / 1000)} seconds.`);
        }
        return true;
    }
    generateCustomKey(context, request, config) {
        const routeName = context.getHandler().name;
        const ip = request.ip || request.socket.remoteAddress;
        const body = request.body;
        const identifier = body?.email || body?.username || request.user?.id || ip;
        return `${config.name || routeName}:${identifier}`;
    }
    getTracker(req) {
        return Promise.resolve(req.ip || req.socket.remoteAddress || 'unknown');
    }
};
exports.AuthThrottlerGuard = AuthThrottlerGuard;
exports.AuthThrottlerGuard = AuthThrottlerGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('THROTTLER_OPTIONS')),
    __param(1, (0, common_1.Inject)('THROTTLER_STORAGE')),
    __metadata("design:paramtypes", [Object, Object, core_1.Reflector])
], AuthThrottlerGuard);
//# sourceMappingURL=auth-throttler.guard.js.map