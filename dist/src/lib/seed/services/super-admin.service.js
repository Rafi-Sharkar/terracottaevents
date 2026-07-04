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
var SuperAdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminService = void 0;
const env_enum_1 = require("../../../common/enum/env.enum");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_utils_service_1 = require("../../utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SuperAdminService = SuperAdminService_1 = class SuperAdminService {
    prisma;
    authUtils;
    configService;
    logger = new common_1.Logger(SuperAdminService_1.name);
    constructor(prisma, authUtils, configService) {
        this.prisma = prisma;
        this.authUtils = authUtils;
        this.configService = configService;
    }
    onModuleInit() {
        return this.seedSuperAdminUser();
    }
    async seedSuperAdminUser() {
        const superAdminEmail = this.configService.getOrThrow(env_enum_1.ENVEnum.SUPER_ADMIN_EMAIL);
        const superAdminPass = this.configService.getOrThrow(env_enum_1.ENVEnum.SUPER_ADMIN_PASS);
        const superAdminExists = await this.prisma.client.user.findFirst({
            where: {
                email: superAdminEmail,
            },
        });
        if (!superAdminExists) {
            await this.prisma.client.user.create({
                data: {
                    name: 'Super Admin',
                    email: superAdminEmail,
                    password: await this.authUtils.hash(superAdminPass),
                    role: 'SUPER_ADMIN',
                    isVerified: true,
                    lastLoginAt: new Date(),
                    lastActiveAt: new Date(),
                },
            });
            this.logger.log(`[CREATE] Super Admin user created with email: ${superAdminEmail}`);
            return;
        }
        await this.prisma.client.user.update({
            where: {
                email: superAdminEmail,
            },
            data: {
                isVerified: true,
                role: 'SUPER_ADMIN',
                lastActiveAt: new Date(),
                lastLoginAt: new Date(),
            },
        });
        this.logger.log(`[UPDATE] Super Admin user updated with email: ${superAdminEmail}`);
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = SuperAdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService,
        config_1.ConfigService])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map