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
exports.AuthLoginService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const login_dto_1 = require("../dto/login.dto");
let AuthLoginService = class AuthLoginService {
    prisma;
    utils;
    constructor(prisma, utils) {
        this.prisma = prisma;
        this.utils = utils;
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.prisma.client.user.findUniqueOrThrow({
            where: { email },
        });
        const isPasswordCorrect = await this.utils.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new handle_error_app_1.AppError(400, 'Invalid password');
        }
        const updatedUser = await this.prisma.client.user.update({
            where: { email },
            data: {
                lastLoginAt: new Date(),
                lastActiveAt: new Date(),
            },
        });
        const token = await this.utils.generateTokenPairAndSave({
            email,
            role: updatedUser.role,
            sub: updatedUser.id,
        });
        return (0, response_util_1.successResponse)({
            user: await this.utils.sanitizeUser(updatedUser),
            token,
        }, 'Logged in successfully');
    }
};
exports.AuthLoginService = AuthLoginService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Login failed', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthLoginService.prototype, "login", null);
exports.AuthLoginService = AuthLoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService])
], AuthLoginService);
//# sourceMappingURL=auth-login.service.js.map