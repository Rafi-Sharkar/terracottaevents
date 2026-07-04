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
exports.BookingService = void 0;
const response_util_1 = require("../../common/utils/response.util");
const handle_error_app_1 = require("../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../core/error/handle-error.decorator");
const booking_mail_service_1 = require("../../lib/mail/services/booking-mail.service");
const prisma_service_1 = require("../../lib/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../../prisma/generated/client");
const booking_dto_1 = require("./dto/booking.dto");
let BookingService = class BookingService {
    prisma;
    bookingMailService;
    constructor(prisma, bookingMailService) {
        this.prisma = prisma;
        this.bookingMailService = bookingMailService;
    }
    formatBooking(booking) {
        if (!booking || !booking.plan)
            return booking;
        const numericPrice = parseFloat(booking.plan.price.replace(/[^0-9.]/g, '')) || 0;
        const discount = booking.discount ?? 0;
        const finalPrice = numericPrice - (numericPrice * (discount / 100));
        return {
            ...booking,
            finalPrice: Number(finalPrice.toFixed(2)),
        };
    }
    async createBooking(userId, dto) {
        const { planId, paymentMethod, discount = 0, } = dto;
        const plan = await this.prisma.client.plan.findUnique({
            where: { id: planId },
        });
        if (!plan) {
            throw new handle_error_app_1.AppError(404, 'Plan not found');
        }
        const booking = await this.prisma.client.booking.create({
            data: {
                userId,
                planId,
                bookingDate: new Date(),
                paymentDate: new Date(0),
                checkInDate: new Date(0),
                checkOutDate: new Date(0),
                paymentMethod,
                discount,
                status: 'NOT_PAID',
            },
            include: {
                user: true,
                plan: true,
            },
        });
        return (0, response_util_1.successResponse)(this.formatBooking(booking), 'Booking placed successfully');
    }
    async submitPayment(bookingId, userId, dto) {
        const booking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        if (booking.userId !== userId) {
            throw new handle_error_app_1.AppError(403, 'You are not authorized to pay for this booking');
        }
        if (booking.status !== 'NOT_PAID' && booking.status !== 'PAYMENT_FAILED') {
            throw new handle_error_app_1.AppError(400, `Cannot submit transaction ID for a booking in status: ${booking.status}`);
        }
        const updateData = {
            status: 'PENDING',
            paymentDate: new Date(),
        };
        if (booking.paymentMethod === 'BKASH') {
            updateData.bkashTransactionId = dto.transactionId;
        }
        else if (booking.paymentMethod === 'NAGAD') {
            updateData.nagadTransactionId = dto.transactionId;
        }
        else if (booking.paymentMethod === 'BANK_TRANSACTION') {
            updateData.bankTransactionId = dto.transactionId;
        }
        else {
            throw new handle_error_app_1.AppError(400, `Payment method ${booking.paymentMethod} does not support transaction ID submission`);
        }
        const updatedBooking = await this.prisma.client.booking.update({
            where: { id: bookingId },
            data: updateData,
            include: {
                user: true,
                plan: true,
            },
        });
        return (0, response_util_1.successResponse)(this.formatBooking(updatedBooking), 'Payment transaction submitted. Status is now pending.');
    }
    async approvePayment(bookingId) {
        const booking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        const updatedBooking = await this.prisma.client.booking.update({
            where: { id: bookingId },
            data: { status: 'PAID' },
            include: {
                user: true,
                plan: true,
            },
        });
        try {
            if (updatedBooking.user.email) {
                await this.bookingMailService.sendPaymentApprovedEmail(updatedBooking.user.email, {
                    id: updatedBooking.id,
                    plan: {
                        name: updatedBooking.plan.name,
                        price: updatedBooking.plan.price,
                    },
                    user: {
                        name: updatedBooking.user.name,
                    },
                });
            }
        }
        catch (mailError) {
            console.warn('Failed to send payment approved email:', mailError.message);
        }
        return (0, response_util_1.successResponse)(this.formatBooking(updatedBooking), 'Booking payment approved successfully');
    }
    async checkIn(bookingId) {
        const booking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        const updatedBooking = await this.prisma.client.booking.update({
            where: { id: bookingId },
            data: {
                status: 'CHECK_IN_COMPLETED',
                checkInDate: new Date(),
            },
            include: {
                user: true,
                plan: {
                    include: {
                        Benefitss: {
                            include: {
                                Benefits: true,
                            },
                        },
                    },
                },
            },
        });
        const benefitNames = updatedBooking.plan.Benefitss?.map((pb) => pb.Benefits.name) || [];
        try {
            if (updatedBooking.user.email) {
                await this.bookingMailService.sendCheckInEmail(updatedBooking.user.email, {
                    id: updatedBooking.id,
                    plan: {
                        name: updatedBooking.plan.name,
                    },
                    user: {
                        name: updatedBooking.user.name,
                    },
                }, benefitNames);
            }
        }
        catch (mailError) {
            console.warn('Failed to send check-in email:', mailError.message);
        }
        return (0, response_util_1.successResponse)(this.formatBooking(updatedBooking), 'Check-in completed successfully');
    }
    async checkOut(bookingId) {
        const booking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        const updatedBooking = await this.prisma.client.booking.update({
            where: { id: bookingId },
            data: {
                status: 'CHECK_OUT_COMPLETED',
                checkOutDate: new Date(),
            },
            include: {
                user: true,
                plan: true,
            },
        });
        return (0, response_util_1.successResponse)(this.formatBooking(updatedBooking), 'Check-out completed successfully');
    }
    async updateBookingStage(bookingId, status) {
        const existingBooking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: true,
                plan: true,
            },
        });
        if (!existingBooking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        const updatedBooking = await this.prisma.client.booking.update({
            where: { id: bookingId },
            data: { status },
            include: {
                user: true,
                plan: {
                    include: {
                        Benefitss: {
                            include: {
                                Benefits: true,
                            },
                        },
                    },
                },
            },
        });
        try {
            if (updatedBooking.user.email) {
                if (status === 'PAID') {
                    await this.bookingMailService.sendPaymentApprovedEmail(updatedBooking.user.email, {
                        id: updatedBooking.id,
                        plan: {
                            name: updatedBooking.plan.name,
                            price: updatedBooking.plan.price,
                        },
                        user: {
                            name: updatedBooking.user.name,
                        },
                    });
                }
                else if (status === 'CHECK_IN_COMPLETED') {
                    const benefitNames = updatedBooking.plan.Benefitss?.map((pb) => pb.Benefits.name) || [];
                    await this.bookingMailService.sendCheckInEmail(updatedBooking.user.email, {
                        id: updatedBooking.id,
                        plan: {
                            name: updatedBooking.plan.name,
                        },
                        user: {
                            name: updatedBooking.user.name,
                        },
                    }, benefitNames);
                }
            }
        }
        catch (mailError) {
            console.warn('Failed to send status update email:', mailError.message);
        }
        return (0, response_util_1.successResponse)(this.formatBooking(updatedBooking), 'Booking status updated successfully');
    }
    async getMyBookings(userId, query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (status) {
            where.status = status;
        }
        const [total, bookings] = await Promise.all([
            this.prisma.client.booking.count({ where }),
            this.prisma.client.booking.findMany({
                where,
                include: {
                    plan: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
        ]);
        return (0, response_util_1.successPaginatedResponse)(bookings.map((b) => this.formatBooking(b)), { page, limit, total }, 'Your bookings retrieved successfully');
    }
    async getAllBookings(query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (status) {
            where.status = status;
        }
        const [total, bookings] = await Promise.all([
            this.prisma.client.booking.count({ where }),
            this.prisma.client.booking.findMany({
                where,
                include: {
                    user: true,
                    plan: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
        ]);
        return (0, response_util_1.successPaginatedResponse)(bookings.map((b) => this.formatBooking(b)), { page, limit, total }, 'All bookings retrieved successfully');
    }
    async getBookingById(bookingId, userId, userRole) {
        const booking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: true,
                plan: true,
            },
        });
        if (!booking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN' && booking.userId !== userId) {
            throw new handle_error_app_1.AppError(403, 'You are not authorized to view this booking');
        }
        return (0, response_util_1.successResponse)(this.formatBooking(booking), 'Booking retrieved successfully');
    }
    async deleteBooking(bookingId, userId, userRole) {
        const booking = await this.prisma.client.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new handle_error_app_1.AppError(404, 'Booking not found');
        }
        if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN' && booking.userId !== userId) {
            throw new handle_error_app_1.AppError(403, 'You are not authorized to delete this booking');
        }
        const deletedBooking = await this.prisma.client.booking.delete({
            where: { id: bookingId },
        });
        return (0, response_util_1.successResponse)(deletedBooking, 'Booking deleted successfully');
    }
};
exports.BookingService = BookingService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to create booking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "createBooking", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to submit booking payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, booking_dto_1.SubmitPaymentDto]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "submitPayment", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to approve payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "approvePayment", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to complete check-in'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "checkIn", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to complete check-out'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "checkOut", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to update booking status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "updateBookingStage", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to retrieve bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.GetBookingsQueryDto]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "getMyBookings", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to retrieve all bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.GetBookingsQueryDto]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "getAllBookings", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to retrieve booking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "getBookingById", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to delete booking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "deleteBooking", null);
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        booking_mail_service_1.BookingMailService])
], BookingService);
//# sourceMappingURL=booking.service.js.map