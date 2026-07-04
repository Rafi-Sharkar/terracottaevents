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
exports.AuthOtpService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const auth_mail_service_1 = require("../../../lib/mail/services/auth-mail.service");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const twilio_service_1 = require("../../../lib/twilio/twilio.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../../../prisma/generated/client");
const otp_dto_1 = require("../dto/otp.dto");
let AuthOtpService = class AuthOtpService {
    prisma;
    utils;
    authMailService;
    twilioService;
    constructor(prisma, utils, authMailService, twilioService) {
        this.prisma = prisma;
        this.utils = utils;
        this.authMailService = authMailService;
        this.twilioService = twilioService;
    }
    async resendOtp({ email, type }) {
        const user = await this.prisma.client.user.findUnique({ where: { email } });
        if (!user)
            throw new handle_error_app_1.AppError(404, 'User not found');
        if (user.isVerified && type === _prisma_1.OtpType.EMAIL_VERIFICATION) {
            throw new handle_error_app_1.AppError(400, 'User is already verified');
        }
        await this.prisma.client.userOtp.deleteMany({
            where: {
                userId: user.id,
                type,
                expiresAt: { gt: new Date() },
            },
        });
        const otp = await this.utils.generateOTPAndSave(user.id, type);
        try {
            if (type === _prisma_1.OtpType.EMAIL_VERIFICATION) {
                await this.authMailService.sendVerificationCodeEmail(email, otp.toString(), {
                    subject: 'Your OTP Code',
                    message: `Here is your OTP code. It will expire in 5 minutes.`,
                });
            }
            if (type === _prisma_1.OtpType.EMAIL_VERIFICATION) {
                await this.authMailService.sendResetPasswordCodeEmail(email, otp.toString(), {
                    subject: 'Your OTP Code',
                    message: `Here is your OTP code. It will expire in 5 minutes.`,
                });
            }
        }
        catch (err) {
            console.error(err);
            await this.prisma.client.userOtp.deleteMany({
                where: { userId: user.id, type },
            });
            throw new handle_error_app_1.AppError(500, 'Failed to send OTP email. Please try again later.');
        }
        return (0, response_util_1.successResponse)(null, `${type} OTP sent successfully`);
    }
    async verifyOTP(dto, type = _prisma_1.OtpType.EMAIL_VERIFICATION) {
        const { email, otp } = dto;
        const user = await this.prisma.client.user.findUnique({ where: { email } });
        if (!user)
            throw new handle_error_app_1.AppError(404, 'User not found');
        const userOtp = await this.prisma.client.userOtp.findFirst({
            where: { userId: user.id, type },
            orderBy: { createdAt: 'desc' },
        });
        if (!userOtp)
            throw new handle_error_app_1.AppError(400, 'OTP is not set. Please request a new one.');
        if (userOtp.expiresAt < new Date()) {
            await this.prisma.client.userOtp.delete({ where: { id: userOtp.id } });
            throw new handle_error_app_1.AppError(400, 'OTP has expired. Please request a new one.');
        }
        const isCorrectOtp = await this.utils.compare(otp, userOtp.code);
        if (!isCorrectOtp)
            throw new handle_error_app_1.AppError(400, 'Invalid OTP');
        await this.prisma.client.userOtp.deleteMany({
            where: { userId: user.id, type },
        });
        const updateData = {
            lastLoginAt: new Date(),
            lastActiveAt: new Date(),
        };
        if (type === _prisma_1.OtpType.EMAIL_VERIFICATION) {
            updateData.isVerified = true;
        }
        const updatedUser = await this.prisma.client.user.update({
            where: { id: user.id },
            data: updateData,
        });
        const token = await this.utils.generateTokenPairAndSave({
            sub: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
        });
        return (0, response_util_1.successResponse)({
            user: await this.utils.sanitizeUser(updatedUser),
            token,
        }, 'OTP verified successfully');
    }
    async verifyPhoneOtp(dto) {
        throw new handle_error_app_1.AppError(501, 'Phone verification is temporarily disabled due to schema updates.');
    }
    async resendPhoneOtp(dto) {
        throw new handle_error_app_1.AppError(501, 'Phone verification is temporarily disabled due to schema updates.');
    }
};
exports.AuthOtpService = AuthOtpService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to resend OTP'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthOtpService.prototype, "resendOtp", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('OTP verification failed', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.VerifyOTPDto, String]),
    __metadata("design:returntype", Promise)
], AuthOtpService.prototype, "verifyOTP", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Phone OTP verification failed', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.VerifyPhoneOtpDto]),
    __metadata("design:returntype", Promise)
], AuthOtpService.prototype, "verifyPhoneOtp", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to resend phone OTP'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.ResetPhoneOtpDto]),
    __metadata("design:returntype", Promise)
], AuthOtpService.prototype, "resendPhoneOtp", null);
exports.AuthOtpService = AuthOtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService,
        auth_mail_service_1.AuthMailService,
        twilio_service_1.TwilioService])
], AuthOtpService);
//# sourceMappingURL=auth-otp.service.js.map