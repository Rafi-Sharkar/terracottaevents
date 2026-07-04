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
exports.DevService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../lib/prisma/prisma.service");
const response_util_1 = require("../../common/utils/response.util");
const handle_error_app_1 = require("../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../core/error/handle-error.decorator");
let DevService = class DevService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers() {
        const users = await this.prisma.client.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return (0, response_util_1.successResponse)(users, 'All users retrieved successfully');
    }
    async deleteUser(userId) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new handle_error_app_1.AppError(404, 'User not found');
        }
        await this.prisma.client.$transaction(async (tx) => {
            await tx.user.delete({ where: { id: userId } });
        });
        return (0, response_util_1.successResponse)(null, 'User deleted successfully');
    }
    async addTokens(userId, tokens) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new handle_error_app_1.AppError(404, 'User not found');
        }
        const updatedUser = await this.prisma.client.user.update({
            where: { id: userId },
            data: {
                tokens: {
                    increment: tokens,
                },
            },
        });
        return (0, response_util_1.successResponse)(updatedUser, `${tokens} tokens added successfully`);
    }
    async subscribeUser(userId, planId) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new handle_error_app_1.AppError(404, 'User not found');
        }
        const plan = await this.prisma.client.plan.findUnique({
            where: { id: planId },
        });
        if (!plan) {
            throw new handle_error_app_1.AppError(404, 'Plan not found');
        }
        const endDate = new Date();
        if (plan.BillingCycle === 'YEARLY') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        }
        else {
            endDate.setMonth(endDate.getMonth() + 1);
        }
        const booking = await this.prisma.client.booking.create({
            data: {
                userId,
                planId,
                status: 'PAID',
                bookingDate: new Date(),
                paymentDate: new Date(),
                checkInDate: new Date(),
                checkOutDate: endDate,
                paymentMethod: 'PHYSICAL',
            },
        });
        const updatedUser = await this.prisma.client.user.update({
            where: { id: userId },
            data: {
                tokens: {
                    increment: 5,
                },
            },
        });
        return (0, response_util_1.successResponse)({ subscription: booking, user: updatedUser }, `Subscription activated and 5 tokens credited to user successfully`);
    }
};
exports.DevService = DevService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to retrieve all users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevService.prototype, "getAllUsers", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to delete user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevService.prototype, "deleteUser", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to add tokens to user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DevService.prototype, "addTokens", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to activate subscription for testing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DevService.prototype, "subscribeUser", null);
exports.DevService = DevService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevService);
//# sourceMappingURL=dev.service.js.map