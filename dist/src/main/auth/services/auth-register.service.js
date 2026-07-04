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
exports.AuthRegisterService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const register_dto_1 = require("../dto/register.dto");
let AuthRegisterService = class AuthRegisterService {
    prisma;
    utils;
    constructor(prisma, utils) {
        this.prisma = prisma;
        this.utils = utils;
    }
    async register(dto) {
        const { email, password, name } = dto;
        const existingUser = await this.prisma.client.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new handle_error_app_1.AppError(400, 'User already exists with this email');
        }
        const newUser = await this.prisma.client.user.create({
            data: {
                email,
                name,
                password: await this.utils.hash(password),
                isVerified: true,
                role: 'USER',
            },
        });
        return (0, response_util_1.successResponse)({
            email: newUser.email,
        }, `Registration successful.`);
    }
};
exports.AuthRegisterService = AuthRegisterService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Registration failed', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthRegisterService.prototype, "register", null);
exports.AuthRegisterService = AuthRegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService])
], AuthRegisterService);
//# sourceMappingURL=auth-register.service.js.map