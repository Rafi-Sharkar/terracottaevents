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
exports.PlanService = void 0;
const response_util_1 = require("../../common/utils/response.util");
const handle_error_app_1 = require("../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../lib/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const plan_dto_1 = require("./dto/plan.dto");
let PlanService = class PlanService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlan(dto) {
        const { name, price, isMostPopular, BillingCycle, benefitIds } = dto;
        const existingPlan = await this.prisma.client.plan.findUnique({
            where: { name },
        });
        if (existingPlan) {
            throw new handle_error_app_1.AppError(400, 'Plan with this name already exists');
        }
        const newPlan = await this.prisma.client.plan.create({
            data: {
                name,
                price,
                isMostPopular: isMostPopular ?? false,
                BillingCycle: BillingCycle ?? 'ONE_TIME',
            },
        });
        if (benefitIds && benefitIds.length > 0) {
            const planBenefitsData = benefitIds.map((benefitId) => ({
                planId: newPlan.id,
                BenefitsId: benefitId,
            }));
            await this.prisma.client.planBenefits.createMany({
                data: planBenefitsData,
            });
        }
        const planWithBenefits = await this.prisma.client.plan.findUnique({
            where: { id: newPlan.id },
            include: {
                Benefitss: {
                    include: {
                        Benefits: true,
                    },
                },
            },
        });
        return (0, response_util_1.successResponse)(planWithBenefits, 'Plan created successfully');
    }
    async createBenefit(dto) {
        const { name } = dto;
        const existingBenefit = await this.prisma.client.benefits.findUnique({
            where: { name },
        });
        if (existingBenefit) {
            throw new handle_error_app_1.AppError(400, 'Benefit with this name already exists');
        }
        const newBenefit = await this.prisma.client.benefits.create({
            data: { name },
        });
        return (0, response_util_1.successResponse)(newBenefit, 'Benefit created successfully');
    }
    async getAllPlans() {
        const plans = await this.prisma.client.plan.findMany({
            include: {
                Benefitss: {
                    include: {
                        Benefits: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return (0, response_util_1.successResponse)(plans, 'Plans retrieved successfully');
    }
    async getPlanById(id) {
        const plan = await this.prisma.client.plan.findUnique({
            where: { id },
            include: {
                Benefitss: {
                    include: {
                        Benefits: true,
                    },
                },
            },
        });
        if (!plan) {
            throw new handle_error_app_1.AppError(404, 'Plan not found');
        }
        return (0, response_util_1.successResponse)(plan, 'Plan retrieved successfully');
    }
    async getAllBenefits() {
        const benefits = await this.prisma.client.benefits.findMany({
            orderBy: { name: 'asc' },
        });
        return (0, response_util_1.successResponse)(benefits, 'Benefits retrieved successfully');
    }
    async deletePlan(planId) {
        const plan = await this.prisma.client.plan.findUnique({
            where: { id: planId },
        });
        if (!plan) {
            throw new handle_error_app_1.AppError(404, 'Plan not found');
        }
        await this.prisma.client.booking.deleteMany({
            where: { planId },
        });
        await this.prisma.client.planBenefits.deleteMany({
            where: { planId },
        });
        const deletedPlan = await this.prisma.client.plan.delete({
            where: { id: planId },
        });
        return (0, response_util_1.successResponse)(deletedPlan, 'Plan and all related bookings deleted successfully');
    }
    async deleteBenefit(benefitId) {
        const benefit = await this.prisma.client.benefits.findUnique({
            where: { id: benefitId },
        });
        if (!benefit) {
            throw new handle_error_app_1.AppError(404, 'Benefit not found');
        }
        await this.prisma.client.planBenefits.deleteMany({
            where: { BenefitsId: benefitId },
        });
        const deletedBenefit = await this.prisma.client.benefits.delete({
            where: { id: benefitId },
        });
        return (0, response_util_1.successResponse)(deletedBenefit, 'Benefit and its relations deleted successfully');
    }
    async removeBenefitFromPlan(planId, benefitId) {
        const relation = await this.prisma.client.planBenefits.findUnique({
            where: {
                planId_BenefitsId: { planId, BenefitsId: benefitId },
            },
        });
        if (!relation) {
            throw new handle_error_app_1.AppError(404, 'Benefit not associated with this plan');
        }
        const removedRelation = await this.prisma.client.planBenefits.delete({
            where: {
                planId_BenefitsId: { planId, BenefitsId: benefitId },
            },
        });
        return (0, response_util_1.successResponse)(removedRelation, 'Benefit removed from plan successfully');
    }
};
exports.PlanService = PlanService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to create plan'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "createPlan", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to create benefit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.CreateBenefitDto]),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "createBenefit", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to fetch plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "getAllPlans", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to fetch plan'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "getPlanById", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to fetch benefits'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "getAllBenefits", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to delete plan'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "deletePlan", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to delete benefit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "deleteBenefit", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to remove benefit from plan'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlanService.prototype, "removeBenefitFromPlan", null);
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanService);
//# sourceMappingURL=plan.service.js.map