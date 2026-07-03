import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { successResponse } from '@/common/utils/response.util';
import { AppError } from '@/core/error/handle-error.app';
import { HandleError } from '@/core/error/handle-error.decorator';

@Injectable()
export class DevService {
  constructor(private readonly prisma: PrismaService) {}

  @HandleError('Failed to retrieve all users')
  async getAllUsers() {
    const users = await this.prisma.client.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return successResponse(users, 'All users retrieved successfully');
  }

  @HandleError('Failed to delete user')
  async deleteUser(userId: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    await this.prisma.client.$transaction(async (tx) => {
      // Delete the user (this will cascade delete Bookings, Otps, etc.)
      await tx.user.delete({ where: { id: userId } });
    });

    return successResponse(null, 'User deleted successfully');
  }

  @HandleError('Failed to add tokens to user')
  async addTokens(userId: string, tokens: number) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const updatedUser = await this.prisma.client.user.update({
      where: { id: userId },
      data: {
        tokens: {
          increment: tokens,
        },
      },
    });

    return successResponse(updatedUser, `${tokens} tokens added successfully`);
  }

  @HandleError('Failed to activate subscription for testing')
  async subscribeUser(userId: string, planId: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const plan = await this.prisma.client.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new AppError(404, 'Plan not found');
    }

    const endDate = new Date();
    if (plan.BillingCycle === 'YEARLY') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
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

    return successResponse(
      { subscription: booking, user: updatedUser },
      `Subscription activated and 5 tokens credited to user successfully`,
    );
  }
}
