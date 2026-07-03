import { successResponse } from '@/common/utils/response.util';
import { AppError } from '@/core/error/handle-error.app';
import { HandleError } from '@/core/error/handle-error.decorator';

import { PrismaService } from '@/lib/prisma/prisma.service';
import { AuthUtilsService } from '@/lib/utils/services/auth-utils.service';
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class AuthUpdateProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authUtils: AuthUtilsService,
  ) {}

  @HandleError('Failed to update profile', 'User')
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const updateData: any = {};
    if (dto.name !== undefined) updateData.name = dto.name.trim() || user.name;
    if (dto.title !== undefined) updateData.title = dto.title.trim();
    if (dto.profilePhoto !== undefined)
      updateData.profilePicture = dto.profilePhoto.trim();
    if (dto.coverPhoto !== undefined)
      updateData.coverPhoto = dto.coverPhoto.trim();

    const updatedUser = await this.prisma.client.user.update({
      where: { id: userId },
      data: updateData,
    });

    return successResponse(
      await this.authUtils.sanitizeUser(updatedUser as any),
      'Profile updated successfully',
    );
  }

  @HandleError('Failed to delete profile', 'User')
  async deleteProfile(userId: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    await this.prisma.client.$transaction(async (tx) => {
      // Delete the user (this will cascade delete Bookings, Otps, etc. due to Prisma schema setup)
      await tx.user.delete({ where: { id: userId } });
    });

    return successResponse(
      null,
      'User profile and all related data deleted successfully',
    );
  }
}
