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
exports.CreateBenefitDto = exports.CreatePlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const _prisma_1 = require("../../../../prisma/generated/client");
class CreatePlanDto {
    name;
    price;
    isMostPopular;
    BillingCycle;
    benefitIds;
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Gold Plan', description: 'Name of the plan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '$99.99', description: 'Price of the plan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is this the most popular plan?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePlanDto.prototype, "isMostPopular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'MONTHLY',
        enum: ['ONE_TIME', 'MONTHLY', 'YEARLY'],
        description: 'Billing cycle of the plan',
    }),
    (0, class_validator_1.IsEnum)(['ONE_TIME', 'MONTHLY', 'YEARLY']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "BillingCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['benefit-uuid-1', 'benefit-uuid-2'],
        description: 'List of benefit IDs associated with the plan',
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePlanDto.prototype, "benefitIds", void 0);
class CreateBenefitDto {
    name;
}
exports.CreateBenefitDto = CreateBenefitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '24/7 Priority Support', description: 'Name of the benefit' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBenefitDto.prototype, "name", void 0);
//# sourceMappingURL=plan.dto.js.map