import { PrismaService } from "../../prisma/prisma.service";
import { AuthUtilsService } from "../../utils/services/auth-utils.service";
import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SuperAdminService implements OnModuleInit {
    private readonly prisma;
    private readonly authUtils;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, authUtils: AuthUtilsService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    seedSuperAdminUser(): Promise<void>;
}
