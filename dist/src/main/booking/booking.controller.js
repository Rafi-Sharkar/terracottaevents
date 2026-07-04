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
exports.BookingController = void 0;
const jwt_decorator_1 = require("../../core/jwt/jwt.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const booking_dto_1 = require("./dto/booking.dto");
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async createBooking(userId, dto) {
        return this.bookingService.createBooking(userId, dto);
    }
    async getAllBookings(query) {
        return this.bookingService.getAllBookings(query);
    }
    async getMyBookings(userId, query) {
        return this.bookingService.getMyBookings(userId, query);
    }
    async getBookingById(bookingId, userId, userRole) {
        return this.bookingService.getBookingById(bookingId, userId, userRole);
    }
    async submitPayment(bookingId, userId, dto) {
        return this.bookingService.submitPayment(bookingId, userId, dto);
    }
    async approvePayment(bookingId) {
        return this.bookingService.approvePayment(bookingId);
    }
    async checkIn(bookingId) {
        return this.bookingService.checkIn(bookingId);
    }
    async checkOut(bookingId) {
        return this.bookingService.checkOut(bookingId);
    }
    async updateBookingStage(bookingId, dto) {
        return this.bookingService.updateBookingStage(bookingId, dto.status);
    }
    async deleteBooking(bookingId, userId, userRole) {
        return this.bookingService.deleteBooking(bookingId, userId, userRole);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Book a plan (User only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, jwt_decorator_1.ValidateUser)(),
    __param(0, (0, jwt_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all bookings (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.GetBookingsQueryDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getAllBookings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s bookings (User only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('my'),
    (0, jwt_decorator_1.ValidateUser)(),
    __param(0, (0, jwt_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.GetBookingsQueryDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getMyBookings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific booking by ID' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, jwt_decorator_1.ValidateAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, jwt_decorator_1.GetUser)('sub')),
    __param(2, (0, jwt_decorator_1.GetUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Submit payment transaction ID (User only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/payment'),
    (0, jwt_decorator_1.ValidateUser)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, jwt_decorator_1.GetUser)('sub')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, booking_dto_1.SubmitPaymentDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "submitPayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Approve booking payment (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/approve'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "approvePayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Complete check-in for a booking (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/check-in'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "checkIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Complete check-out for a booking (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/check-out'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "checkOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update booking stage / status (Super Admin only)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/stage'),
    (0, jwt_decorator_1.ValidateSuperAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.UpdateBookingStatusDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBookingStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a booking (User/Admin)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, jwt_decorator_1.ValidateAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, jwt_decorator_1.GetUser)('sub')),
    __param(2, (0, jwt_decorator_1.GetUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "deleteBooking", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiTags)('Bookings'),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map