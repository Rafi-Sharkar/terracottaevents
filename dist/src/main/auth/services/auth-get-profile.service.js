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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGetProfileService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
let AuthGetProfileService = class AuthGetProfileService {
    prisma;
    authUtils;
    constructor(prisma, authUtils) {
        this.prisma = prisma;
        this.authUtils = authUtils;
    }
    async getProfile(userId) {
        const user = await this.findUserBy('id', userId);
        return user;
    }
    async findUserBy(key, value) {
        const where = {};
        where[key] = value;
        const user = await this.prisma.client.user.findUniqueOrThrow({
            where,
            include: {
                booking: {
                    include: {
                        plan: true,
                    },
                },
            },
        });
        const { booking, ...mainUser } = user;
        const sanitizedUser = await this.authUtils.sanitizeUser(mainUser);
        const data = {
            ...sanitizedUser,
            booking: booking || [],
        };
        return (0, response_util_1.successResponse)(data, 'User data fetched successfully');
    }
};
exports.AuthGetProfileService = AuthGetProfileService;
__decorate([
    (0, handle_error_decorator_1.HandleError)("Can't get user profile"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthGetProfileService.prototype, "getProfile", null);
exports.AuthGetProfileService = AuthGetProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService])
], AuthGetProfileService);
//# sourceMappingURL=auth-get-profile.service.js.map