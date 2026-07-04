import { CustomThrottleConfig } from './auth-throttler.guard';
export declare const SkipThrottle: () => import("@nestjs/common").CustomDecorator<string>;
export declare const CustomThrottle: (config: CustomThrottleConfig) => import("@nestjs/common").CustomDecorator<string>;
export declare const ThrottleLogin: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ThrottleSignup: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ThrottleOtp: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ThrottlePasswordReset: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ThrottleRefreshToken: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ThrottleVerifyEmail: () => import("@nestjs/common").CustomDecorator<string>;
