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
exports.PlanController = void 0;
const jwt_decorator_1 = require("../../core/jwt/jwt.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plan_dto_1 = require("./dto/plan.dto");
const plan_service_1 = require("./plan.service");
let PlanController = class PlanController {
    planService;
    constructor(planService) {
        this.planService = planService;
    }
    async createPlan(dto) {
        return this.planService.createPlan(dto);
    }
    async createBenefit(dto) {
        return this.planService.createBenefit(dto);
    }
    async getAllBenefits() {
        return this.planService.getAllBenefits();
    }
    async getAllPlans() {
        return this.planService.getAllPlans();
    }
    async getPlanById(id) {
        return this.planService.getPlanById(id);
    }
    async deletePlan(id) {
        return this.planService.deletePlan(id);
    }
    async deleteBenefit(id) {
        return this.planService.deleteBenefit(id);
    }
    async removeBenefitFromPlan(planId, benefitId) {
        return this.planService.removeBenefitFromPlan(planId, benefitId);
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new plan (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "createPlan", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new benefit (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('benefits'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.CreateBenefitDto]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "createBenefit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all benefits' }),
    (0, common_1.Get)('benefits'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getAllBenefits", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all plans with their associated benefits' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getAllPlans", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get plan details by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getPlanById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a plan (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "deletePlan", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a benefit (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('benefits/:id'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "deleteBenefit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove a benefit from a plan (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':planId/benefits/:benefitId'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Param)('benefitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "removeBenefitFromPlan", null);
exports.PlanController = PlanController = __decorate([
    (0, swagger_1.ApiTags)('Plans & Benefits'),
    (0, common_1.Controller)('plans'),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map