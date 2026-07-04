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
exports.ResetPhoneOtpDto = exports.VerifyPhoneOtpDto = exports.VerifyOTPDto = exports.ResendOtpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const _prisma_1 = require("../../../../prisma/generated/client");
const class_validator_1 = require("class-validator");
class ResendOtpDto {
    email;
    type = _prisma_1.OtpType.EMAIL_VERIFICATION;
}
exports.ResendOtpDto = ResendOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@gmail.com',
        description: 'User email address',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResendOtpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: _prisma_1.OtpType.EMAIL_VERIFICATION,
        description: 'OTP type',
        enum: _prisma_1.OtpType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(_prisma_1.OtpType),
    __metadata("design:type", String)
], ResendOtpDto.prototype, "type", void 0);
class VerifyOTPDto {
    otp;
    email;
}
exports.VerifyOTPDto = VerifyOTPDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1234',
        description: 'OTP code',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyOTPDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john@gmail.com',
        description: 'Email address',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyOTPDto.prototype, "email", void 0);
class VerifyPhoneOtpDto {
    otp;
    phoneNumber;
}
exports.VerifyPhoneOtpDto = VerifyPhoneOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1234',
        description: 'OTP code',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyPhoneOtpDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+8801234567890',
        description: 'Phone number (international format)',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], VerifyPhoneOtpDto.prototype, "phoneNumber", void 0);
class ResetPhoneOtpDto {
    phoneNumber;
    type = _prisma_1.OtpType.PHONE_VERIFICATION;
}
exports.ResetPhoneOtpDto = ResetPhoneOtpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+8801234567890',
        description: 'User phone number (international format)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResetPhoneOtpDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: _prisma_1.OtpType.PHONE_VERIFICATION,
        description: 'OTP type',
        enum: _prisma_1.OtpType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(_prisma_1.OtpType),
    __metadata("design:type", String)
], ResetPhoneOtpDto.prototype, "type", void 0);
//# sourceMappingURL=otp.dto.js.map