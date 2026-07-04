"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottleVerifyEmail = exports.ThrottleRefreshToken = exports.ThrottlePasswordReset = exports.ThrottleOtp = exports.ThrottleSignup = exports.ThrottleLogin = exports.CustomThrottle = exports.SkipThrottle = void 0;
const common_1 = require("@nestjs/common");
const auth_throttler_guard_1 = require("./auth-throttler.guard");
const SkipThrottle = () => (0, common_1.SetMetadata)(auth_throttler_guard_1.THROTTLE_SKIP_KEY, true);
exports.SkipThrottle = SkipThrottle;
const CustomThrottle = (config) => (0, common_1.SetMetadata)(auth_throttler_guard_1.THROTTLE_CONFIG_KEY, config);
exports.CustomThrottle = CustomThrottle;
const ThrottleLogin = () => (0, exports.CustomThrottle)({
    limit: 5,
    ttl: 900000,
    name: 'auth:login',
    blockDuration: 1800000,
});
exports.ThrottleLogin = ThrottleLogin;
const ThrottleSignup = () => (0, exports.CustomThrottle)({
    limit: 3,
    ttl: 3600000,
    name: 'auth:signup',
});
exports.ThrottleSignup = ThrottleSignup;
const ThrottleOtp = () => (0, exports.CustomThrottle)({
    limit: 3,
    ttl: 300000,
    name: 'auth:otp',
});
exports.ThrottleOtp = ThrottleOtp;
const ThrottlePasswordReset = () => (0, exports.CustomThrottle)({
    limit: 3,
    ttl: 3600000,
    name: 'auth:password-reset',
});
exports.ThrottlePasswordReset = ThrottlePasswordReset;
const ThrottleRefreshToken = () => (0, exports.CustomThrottle)({
    limit: 10,
    ttl: 60000,
    name: 'auth:refresh-token',
});
exports.ThrottleRefreshToken = ThrottleRefreshToken;
const ThrottleVerifyEmail = () => (0, exports.CustomThrottle)({
    limit: 5,
    ttl: 600000,
    name: 'auth:verify-email',
});
exports.ThrottleVerifyEmail = ThrottleVerifyEmail;
//# sourceMappingURL=throttle.decorator.js.map