import { ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
export declare const THROTTLE_SKIP_KEY = "throttle_skip";
export declare const THROTTLE_CONFIG_KEY = "throttle_config";
export interface CustomThrottleConfig {
    limit: number;
    ttl: number;
    name?: string;
    blockDuration?: number;
}
export declare class AuthThrottlerGuard extends ThrottlerGuard {
    protected readonly options: ThrottlerModuleOptions;
    protected readonly storageService: ThrottlerStorage;
    protected readonly reflector: Reflector;
    constructor(options: ThrottlerModuleOptions, storageService: ThrottlerStorage, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private handleCustomThrottle;
    protected generateCustomKey(context: ExecutionContext, request: Request, config: CustomThrottleConfig): string;
    protected getTracker(req: Request): Promise<string>;
}
