import { UserResponseDto } from "../../../common/dto/user-response.dto";
import { JWTPayload, TokenPair } from "../../../core/jwt/jwt.interface";
import { PrismaService } from "../../prisma/prisma.service";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FileInstance, OtpType, User } from "../../../../prisma/generated/client";
export declare class AuthUtilsService {
    private readonly jwtService;
    private readonly configService;
    private readonly prisma;
    private saltRounds;
    private refreshTokenDays;
    private refreshTokenLength;
    constructor(jwtService: JwtService, configService: ConfigService, prisma: PrismaService);
    sanitizeUser<T = UserResponseDto>(user: User & {
        profilePicture?: FileInstance | string | null;
    }): Promise<T>;
    generateToken(payload: JWTPayload): string;
    generateTokenPairAndSave(payload: JWTPayload): Promise<TokenPair>;
    verifyToken<T extends object = any>(token: string): T;
    decodeToken(token: string): any;
    revokeRefreshToken(token: string): Promise<void>;
    revokeAllRefreshTokensForUser(userId: string): Promise<void>;
    findRefreshToken(token: string): Promise<{
        id: string;
        userId: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
        token: string;
    } | null>;
    generateOtpAndExpiry(minutes?: number): {
        otp: number;
        expiryTime: Date;
    };
    generateOTPAndSave(userId: string, type: OtpType): Promise<number>;
    getSanitizedUserById(id: string): Promise<UserResponseDto>;
    getUserByEmail(email: string): Promise<UserResponseDto | null>;
    hash(value: string): Promise<string>;
    compare(value: string, hash: string): Promise<boolean>;
}
