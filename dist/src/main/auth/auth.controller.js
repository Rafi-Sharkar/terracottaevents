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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jwt_decorator_1 = require("../../core/jwt/jwt.decorator");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const logout_dto_1 = require("./dto/logout.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const auth_get_profile_service_1 = require("./services/auth-get-profile.service");
const auth_login_service_1 = require("./services/auth-login.service");
const auth_logout_service_1 = require("./services/auth-logout.service");
const auth_otp_service_1 = require("./services/auth-otp.service");
const auth_password_service_1 = require("./services/auth-password.service");
const auth_register_service_1 = require("./services/auth-register.service");
const auth_update_profile_service_1 = require("./services/auth-update-profile.service");
const google_auth_service_1 = require("./services/google-auth.service");
const google_auth_dto_1 = require("./dto/google-auth.dto");
const register_dto_1 = require("./dto/register.dto");
const otp_dto_1 = require("./dto/otp.dto");
const login_dto_1 = require("./dto/login.dto");
let AuthController = class AuthController {
    authRegisterService;
    authLoginService;
    authLogoutService;
    authOtpService;
    authPasswordService;
    authGetProfileService;
    authUpdateProfileService;
    googleAuthService;
    constructor(authRegisterService, authLoginService, authLogoutService, authOtpService, authPasswordService, authGetProfileService, authUpdateProfileService, googleAuthService) {
        this.authRegisterService = authRegisterService;
        this.authLoginService = authLoginService;
        this.authLogoutService = authLogoutService;
        this.authOtpService = authOtpService;
        this.authPasswordService = authPasswordService;
        this.authGetProfileService = authGetProfileService;
        this.authUpdateProfileService = authUpdateProfileService;
        this.googleAuthService = googleAuthService;
    }
    async register(body) {
        return this.authRegisterService.register(body);
    }
    async verifyEmail(body) {
        return this.authOtpService.verifyOTP(body);
    }
    async login(body, res) {
        const result = (await this.authLoginService.login(body));
        res.cookie('token', result?.data?.token?.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return { result, message: 'Login successful' };
    }
    async googleLogin(dto, res) {
        const result = (await this.googleAuthService.googleLogin(dto));
        return { result, message: 'Google login successful' };
    }
    async logOut(userId, dto) {
        return this.authLogoutService.logout(userId, dto);
    }
    async refresh(dto, res) {
        const result = await this.authLogoutService.refresh(dto);
        return { result, message: 'Login successful' };
    }
    async getProfile(userId) {
        return this.authGetProfileService.getProfile(userId);
    }
    update(id, dto) {
        return this.authUpdateProfileService.updateProfile(id, dto);
    }
    deleteProfile(id) {
        return this.authUpdateProfileService.deleteProfile(id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User Registration with Email' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verify OTP after Registration or Login' }),
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.VerifyOTPDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User Login' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Google Sign-In with Firebase' }),
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_auth_dto_1.GoogleAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User Logout' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('logout'),
    (0, jwt_decorator_1.ValidateAuth)(),
    __param(0, (0, jwt_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, logout_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.RefreshTokenDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User Profile' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('profile'),
    (0, jwt_decorator_1.ValidateAuth)(),
    __param(0, (0, jwt_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update profile' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('profile'),
    (0, jwt_decorator_1.ValidateAuth)(),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, jwt_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete profile and all related data' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('profile'),
    (0, jwt_decorator_1.ValidateAuth)(),
    __param(0, (0, jwt_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_register_service_1.AuthRegisterService,
        auth_login_service_1.AuthLoginService,
        auth_logout_service_1.AuthLogoutService,
        auth_otp_service_1.AuthOtpService,
        auth_password_service_1.AuthPasswordService,
        auth_get_profile_service_1.AuthGetProfileService,
        auth_update_profile_service_1.AuthUpdateProfileService,
        google_auth_service_1.GoogleAuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map