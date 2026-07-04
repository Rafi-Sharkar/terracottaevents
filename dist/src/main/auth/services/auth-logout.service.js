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
exports.AuthLogoutService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const logout_dto_1 = require("../dto/logout.dto");
let AuthLogoutService = class AuthLogoutService {
    prisma;
    utils;
    constructor(prisma, utils) {
        this.prisma = prisma;
        this.utils = utils;
    }
    async logout(userId, dto) {
        const tokenRecord = await this.utils.findRefreshToken(dto.refreshToken);
        if (!tokenRecord || tokenRecord.userId !== userId) {
            throw new handle_error_app_1.AppError(common_1.HttpStatus.UNAUTHORIZED, 'Invalid refresh token');
        }
        await this.utils.revokeAllRefreshTokensForUser(userId);
        return (0, response_util_1.successResponse)(null, 'Logout successful');
    }
    async refresh(dto) {
        const tokenRecord = await this.utils.findRefreshToken(dto.refreshToken);
        if (!tokenRecord) {
            throw new handle_error_app_1.AppError(common_1.HttpStatus.UNAUTHORIZED, 'Invalid or expired refresh token');
        }
        if (tokenRecord.expiresAt < new Date()) {
            await this.utils.revokeRefreshToken(dto.refreshToken);
            throw new handle_error_app_1.AppError(common_1.HttpStatus.UNAUTHORIZED, 'Refresh token expired');
        }
        const user = await this.prisma.client.user.findUnique({
            where: { id: tokenRecord.userId },
        });
        if (!user) {
            await this.utils.revokeRefreshToken(dto.refreshToken);
            throw new handle_error_app_1.AppError(common_1.HttpStatus.UNAUTHORIZED, 'User not found');
        }
        await this.utils.revokeRefreshToken(dto.refreshToken);
        const tokenPair = await this.utils.generateTokenPairAndSave({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return (0, response_util_1.successResponse)(tokenPair, 'Token refreshed successfully');
    }
};
exports.AuthLogoutService = AuthLogoutService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Logout user failed', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, logout_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthLogoutService.prototype, "logout", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Refresh token failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthLogoutService.prototype, "refresh", null);
exports.AuthLogoutService = AuthLogoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService])
], AuthLogoutService);
//# sourceMappingURL=auth-logout.service.js.map