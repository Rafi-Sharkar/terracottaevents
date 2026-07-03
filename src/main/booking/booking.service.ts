import { successResponse, successPaginatedResponse, TResponse, TPaginatedResponse } from '@/common/utils/response.util';
import { AppError } from '@/core/error/handle-error.app';
import { HandleError } from '@/core/error/handle-error.decorator';
import { BookingMailService } from '@/lib/mail/services/booking-mail.service';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BookingStatus } from '@prisma';
import { CreateBookingDto, SubmitPaymentDto, GetBookingsQueryDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingMailService: BookingMailService,
  ) {}

  private formatBooking(booking: any) {
    if (!booking || !booking.plan) return booking;
    const numericPrice = parseFloat(booking.plan.price.replace(/[^0-9.]/g, '')) || 0;
    const discount = booking.discount ?? 0;
    const finalPrice = numericPrice - (numericPrice * (discount / 100));
    return {
      ...booking,
      finalPrice: Number(finalPrice.toFixed(2)),
    };
  }

  @HandleError('Failed to create booking')
  async createBooking(
    userId: string,
    dto: CreateBookingDto,
  ): Promise<TResponse<any>> {
    const {
      planId,
      paymentMethod,
      discount = 0,
    } = dto;

    // 1. Check if plan exists
    const plan = await this.prisma.client.plan.findUnique({
      where: { id: planId },
    });
    if (!plan) {
      throw new AppError(404, 'Plan not found');
    }

    // 2. Create the booking
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

    // 3. (Email verification/sending removed from createBooking)

    return successResponse(this.formatBooking(booking), 'Booking placed successfully');
  }

  @HandleError('Failed to submit booking payment')
  async submitPayment(
    bookingId: string,
    userId: string,
    dto: SubmitPaymentDto,
  ): Promise<TResponse<any>> {
    const booking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    if (booking.userId !== userId) {
      throw new AppError(403, 'You are not authorized to pay for this booking');
    }

    if (booking.status !== 'NOT_PAID' && booking.status !== 'PAYMENT_FAILED') {
      throw new AppError(400, `Cannot submit transaction ID for a booking in status: ${booking.status}`);
    }

    const updateData: any = {
      status: 'PENDING',
      paymentDate: new Date(),
    };

    if (booking.paymentMethod === 'BKASH') {
      updateData.bkashTransactionId = dto.transactionId;
    } else if (booking.paymentMethod === 'NAGAD') {
      updateData.nagadTransactionId = dto.transactionId;
    } else if (booking.paymentMethod === 'BANK_TRANSACTION') {
      updateData.bankTransactionId = dto.transactionId;
    } else {
      throw new AppError(400, `Payment method ${booking.paymentMethod} does not support transaction ID submission`);
    }

    const updatedBooking = await this.prisma.client.booking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        user: true,
        plan: true,
      },
    });

    return successResponse(this.formatBooking(updatedBooking), 'Payment transaction submitted. Status is now pending.');
  }

  @HandleError('Failed to approve payment')
  async approvePayment(bookingId: string): Promise<TResponse<any>> {
    const booking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    const updatedBooking = await this.prisma.client.booking.update({
      where: { id: bookingId },
      data: { status: 'PAID' },
      include: {
        user: true,
        plan: true,
      },
    });

    // Send payment approved email
    try {
      if (updatedBooking.user.email) {
        await this.bookingMailService.sendPaymentApprovedEmail(
          updatedBooking.user.email,
          {
            id: updatedBooking.id,
            plan: {
              name: updatedBooking.plan.name,
              price: updatedBooking.plan.price,
            },
            user: {
              name: updatedBooking.user.name,
            },
          },
        );
      }
    } catch (mailError) {
      console.warn('Failed to send payment approved email:', mailError.message);
    }

    return successResponse(this.formatBooking(updatedBooking), 'Booking payment approved successfully');
  }

  @HandleError('Failed to complete check-in')
  async checkIn(bookingId: string): Promise<TResponse<any>> {
    const booking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
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

    // Extract benefit names
    const benefitNames = updatedBooking.plan.Benefitss?.map((pb: any) => pb.Benefits.name) || [];

    // Send check-in email
    try {
      if (updatedBooking.user.email) {
        await this.bookingMailService.sendCheckInEmail(
          updatedBooking.user.email,
          {
            id: updatedBooking.id,
            plan: {
              name: updatedBooking.plan.name,
            },
            user: {
              name: updatedBooking.user.name,
            },
          },
          benefitNames,
        );
      }
    } catch (mailError) {
      console.warn('Failed to send check-in email:', mailError.message);
    }

    return successResponse(this.formatBooking(updatedBooking), 'Check-in completed successfully');
  }

  @HandleError('Failed to complete check-out')
  async checkOut(bookingId: string): Promise<TResponse<any>> {
    const booking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
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

    return successResponse(this.formatBooking(updatedBooking), 'Check-out completed successfully');
  }

  @HandleError('Failed to update booking status')
  async updateBookingStage(
    bookingId: string,
    status: BookingStatus,
  ): Promise<TResponse<any>> {
    const existingBooking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        plan: true,
      },
    });
    if (!existingBooking) {
      throw new AppError(404, 'Booking not found');
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

    // Send emails ONLY for PAID and CHECK_IN_COMPLETED
    try {
      if (updatedBooking.user.email) {
        if (status === 'PAID') {
          await this.bookingMailService.sendPaymentApprovedEmail(
            updatedBooking.user.email,
            {
              id: updatedBooking.id,
              plan: {
                name: updatedBooking.plan.name,
                price: updatedBooking.plan.price,
              },
              user: {
                name: updatedBooking.user.name,
              },
            },
          );
        } else if (status === 'CHECK_IN_COMPLETED') {
          const benefitNames = updatedBooking.plan.Benefitss?.map((pb: any) => pb.Benefits.name) || [];
          await this.bookingMailService.sendCheckInEmail(
            updatedBooking.user.email,
            {
              id: updatedBooking.id,
              plan: {
                name: updatedBooking.plan.name,
              },
              user: {
                name: updatedBooking.user.name,
              },
            },
            benefitNames,
          );
        }
      }
    } catch (mailError) {
      console.warn('Failed to send status update email:', mailError.message);
    }

    return successResponse(this.formatBooking(updatedBooking), 'Booking status updated successfully');
  }

  @HandleError('Failed to retrieve bookings')
  async getMyBookings(userId: string, query: GetBookingsQueryDto): Promise<TPaginatedResponse<any>> {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
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

    return successPaginatedResponse(
      bookings.map((b) => this.formatBooking(b)),
      { page, limit, total },
      'Your bookings retrieved successfully',
    );
  }

  @HandleError('Failed to retrieve all bookings')
  async getAllBookings(query: GetBookingsQueryDto): Promise<TPaginatedResponse<any>> {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
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

    return successPaginatedResponse(
      bookings.map((b) => this.formatBooking(b)),
      { page, limit, total },
      'All bookings retrieved successfully',
    );
  }

  @HandleError('Failed to retrieve booking')
  async getBookingById(
    bookingId: string,
    userId: string,
    userRole: string,
  ): Promise<TResponse<any>> {
    const booking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        plan: true,
      },
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN' && booking.userId !== userId) {
      throw new AppError(403, 'You are not authorized to view this booking');
    }

    return successResponse(this.formatBooking(booking), 'Booking retrieved successfully');
  }

  @HandleError('Failed to delete booking')
  async deleteBooking(
    bookingId: string,
    userId: string,
    userRole: string,
  ): Promise<TResponse<any>> {
    const booking = await this.prisma.client.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN' && booking.userId !== userId) {
      throw new AppError(403, 'You are not authorized to delete this booking');
    }

    const deletedBooking = await this.prisma.client.booking.delete({
      where: { id: bookingId },
    });

    return successResponse(deletedBooking, 'Booking deleted successfully');
  }
}

