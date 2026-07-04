"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const schedule_1 = require("@nestjs/schedule");
const serve_static_1 = require("@nestjs/serve-static");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const env_enum_1 = require("./common/enum/env.enum");
const jwt_strategy_1 = require("./core/jwt/jwt.strategy");
const logger_middleware_1 = require("./core/middleware/logger.middleware");
const lib_module_1 = require("./lib/lib.module");
const main_module_1 = require("./main/main.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            event_emitter_1.EventEmitterModule.forRoot({
                global: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/files',
            }),
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const host = configService.getOrThrow(env_enum_1.ENVEnum.REDIS_HOST);
                    const port = configService.getOrThrow(env_enum_1.ENVEnum.REDIS_PORT);
                    return {
                        connection: {
                            host,
                            port: parseInt(port, 10),
                        },
                    };
                },
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 10,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 50,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 200,
                },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    secret: await config.getOrThrow(env_enum_1.ENVEnum.JWT_SECRET),
                    signOptions: {
                        expiresIn: await config.getOrThrow(env_enum_1.ENVEnum.JWT_EXPIRES_IN),
                    },
                }),
            }),
            lib_module_1.LibModule,
            main_module_1.MainModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            jwt_strategy_1.JwtStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
        exports: [jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map