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
exports.GetBookingsQueryDto = exports.UpdateBookingStatusDto = exports.SubmitPaymentDto = exports.CreateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const _prisma_1 = require("../../../../prisma/generated/client");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
class CreateBookingDto {
    planId;
    paymentMethod;
    discount;
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'plan-uuid-here', description: 'ID of the plan being booked' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BKASH',
        enum: ['PHYSICAL', 'BKASH', 'NAGAD', 'BANK_TRANSACTION'],
        description: 'Method used for payment',
    }),
    (0, class_validator_1.IsEnum)(['PHYSICAL', 'BKASH', 'NAGAD', 'BANK_TRANSACTION']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, description: 'Discount percentage (e.g. 25 for 25%)', required: false, default: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "discount", void 0);
class SubmitPaymentDto {
    transactionId;
}
exports.SubmitPaymentDto = SubmitPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TXN123456', description: 'Transaction ID based on PaymentMethod' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmitPaymentDto.prototype, "transactionId", void 0);
class UpdateBookingStatusDto {
    status;
}
exports.UpdateBookingStatusDto = UpdateBookingStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PAID',
        enum: [
            'PENDING',
            'PAID',
            'NOT_PAID',
            'PAYMENT_CONFIRM',
            'PAYMENT_FAILED',
            'CHECK_IN_COMPLETED',
            'CHECK_OUT_COMPLETED',
        ],
        description: 'Updated booking status',
    }),
    (0, class_validator_1.IsEnum)([
        'PENDING',
        'PAID',
        'NOT_PAID',
        'PAYMENT_CONFIRM',
        'PAYMENT_FAILED',
        'CHECK_IN_COMPLETED',
        'CHECK_OUT_COMPLETED',
    ]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateBookingStatusDto.prototype, "status", void 0);
class GetBookingsQueryDto extends pagination_dto_1.PaginationDto {
    status;
}
exports.GetBookingsQueryDto = GetBookingsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: _prisma_1.BookingStatus,
        description: 'Filter bookings by status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(_prisma_1.BookingStatus),
    __metadata("design:type", String)
], GetBookingsQueryDto.prototype, "status", void 0);
//# sourceMappingURL=booking.dto.js.map