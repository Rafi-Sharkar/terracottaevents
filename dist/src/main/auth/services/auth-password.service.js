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
exports.AuthPasswordService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const auth_mail_service_1 = require("../../../lib/mail/services/auth-mail.service");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../../../prisma/generated/client");
const password_dto_1 = require("../dto/password.dto");
let AuthPasswordService = class AuthPasswordService {
    prisma;
    utils;
    mailService;
    constructor(prisma, utils, mailService) {
        this.prisma = prisma;
        this.utils = utils;
        this.mailService = mailService;
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
            select: { password: true },
        });
        if (!user)
            throw new handle_error_app_1.AppError(404, 'User not found');
        if (!user.password) {
            const hashedPassword = await this.utils.hash(dto.newPassword);
            await this.prisma.client.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
            return (0, response_util_1.successResponse)(null, 'Password set successfully');
        }
        if (!dto.password)
            throw new handle_error_app_1.AppError(400, 'Current password is required');
        const isValid = await this.utils.compare(dto.password, user.password);
        if (!isValid)
            throw new handle_error_app_1.AppError(400, 'Invalid current password');
        const hashedPassword = await this.utils.hash(dto.newPassword);
        await this.prisma.client.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return (0, response_util_1.successResponse)(null, 'Password updated successfully');
    }
    async forgotPassword(email) {
        const user = await this.prisma.client.user.findUnique({ where: { email } });
        if (!user)
            throw new handle_error_app_1.AppError(404, 'User not found');
        await this.prisma.client.userOtp.deleteMany({
            where: {
                userId: user.id,
                type: _prisma_1.OtpType.PASSWORD_RESET,
                expiresAt: { gt: new Date() },
            },
        });
        const otp = await this.utils.generateOTPAndSave(user.id, _prisma_1.OtpType.PASSWORD_RESET);
        await this.mailService.sendResetPasswordCodeEmail(email, otp.toString());
        return (0, response_util_1.successResponse)(null, 'Password reset OTP sent');
    }
    async resetPassword(dto) {
        const { otp, email, newPassword } = dto;
        const user = await this.prisma.client.user.findUnique({ where: { email } });
        if (!user)
            throw new handle_error_app_1.AppError(404, 'User not found');
        const userOtp = await this.prisma.client.userOtp.findFirst({
            where: { userId: user.id, type: _prisma_1.OtpType.PASSWORD_RESET },
            orderBy: { createdAt: 'desc' },
        });
        if (!userOtp)
            throw new handle_error_app_1.AppError(400, 'OTP is not set. Please request a new one.');
        if (userOtp.expiresAt < new Date()) {
            await this.prisma.client.userOtp.delete({ where: { id: userOtp.id } });
            throw new handle_error_app_1.AppError(401, 'OTP has expired. Please request a new one.');
        }
        const isValid = await this.utils.compare(otp, userOtp.code);
        if (!isValid)
            throw new handle_error_app_1.AppError(403, 'Invalid OTP');
        const hashedPassword = await this.utils.hash(newPassword);
        await this.prisma.client.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });
        await this.prisma.client.userOtp.delete({ where: { id: userOtp.id } });
        await this.mailService.sendPasswordResetConfirmationEmail(email);
        return (0, response_util_1.successResponse)(null, 'Password reset successfully');
    }
};
exports.AuthPasswordService = AuthPasswordService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to change password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthPasswordService.prototype, "changePassword", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to send password reset email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthPasswordService.prototype, "forgotPassword", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to reset password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthPasswordService.prototype, "resetPassword", null);
exports.AuthPasswordService = AuthPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService,
        auth_mail_service_1.AuthMailService])
], AuthPasswordService);
//# sourceMappingURL=auth-password.service.js.map