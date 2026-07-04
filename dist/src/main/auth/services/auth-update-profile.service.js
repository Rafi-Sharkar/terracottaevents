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
exports.AuthUpdateProfileService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const update_profile_dto_1 = require("../dto/update-profile.dto");
let AuthUpdateProfileService = class AuthUpdateProfileService {
    prisma;
    authUtils;
    constructor(prisma, authUtils) {
        this.prisma = prisma;
        this.authUtils = authUtils;
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new handle_error_app_1.AppError(404, 'User not found');
        }
        const updateData = {};
        if (dto.name !== undefined)
            updateData.name = dto.name.trim() || user.name;
        if (dto.title !== undefined)
            updateData.title = dto.title.trim();
        if (dto.profilePhoto !== undefined)
            updateData.profilePicture = dto.profilePhoto.trim();
        if (dto.coverPhoto !== undefined)
            updateData.coverPhoto = dto.coverPhoto.trim();
        const updatedUser = await this.prisma.client.user.update({
            where: { id: userId },
            data: updateData,
        });
        return (0, response_util_1.successResponse)(await this.authUtils.sanitizeUser(updatedUser), 'Profile updated successfully');
    }
    async deleteProfile(userId) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new handle_error_app_1.AppError(404, 'User not found');
        }
        await this.prisma.client.$transaction(async (tx) => {
            await tx.user.delete({ where: { id: userId } });
        });
        return (0, response_util_1.successResponse)(null, 'User profile and all related data deleted successfully');
    }
};
exports.AuthUpdateProfileService = AuthUpdateProfileService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to update profile', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthUpdateProfileService.prototype, "updateProfile", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to delete profile', 'User'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthUpdateProfileService.prototype, "deleteProfile", null);
exports.AuthUpdateProfileService = AuthUpdateProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_utils_service_1.AuthUtilsService])
], AuthUpdateProfileService);
//# sourceMappingURL=auth-update-profile.service.js.map