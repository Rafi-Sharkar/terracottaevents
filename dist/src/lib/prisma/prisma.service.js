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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const env_enum_1 = require("../../common/enum/env.enum");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const _prisma_1 = require("../../../prisma/generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
let PrismaService = PrismaService_1 = class PrismaService {
    configService;
    logger = new common_1.Logger(PrismaService_1.name);
    prisma;
    connectionString;
    constructor(configService) {
        this.configService = configService;
        this.connectionString = this.configService.getOrThrow(env_enum_1.ENVEnum.DATABASE_URL);
        const adapter = new adapter_pg_1.PrismaPg({ connectionString: this.connectionString });
        this.prisma = new _prisma_1.PrismaClient({
            adapter,
            log: [{ emit: 'event', level: 'error' }],
        });
    }
    async onModuleInit() {
        this.logger.log('[INIT] Prisma connecting...');
        await this.prisma.$connect();
        this.logger.log('[INIT] Prisma connected');
    }
    async onModuleDestroy() {
        this.logger.log('[DESTROY] Prisma disconnecting...');
        await this.prisma.$disconnect();
        this.logger.log('[DESTROY] Prisma disconnected');
    }
    get client() {
        return this.prisma;
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map