import { UserRole, UserStatus } from "../../../prisma/generated/client";
export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    isVerified: boolean;
    lastLoginAt?: Date;
    lastActiveAt?: Date;
    profilePictureId?: string;
    profilePictureUrl?: string;
    avatarUrl?: string;
    tokens: number;
    createdAt: Date;
    updatedAt: Date;
}
