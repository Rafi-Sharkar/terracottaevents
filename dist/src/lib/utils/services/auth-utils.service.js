"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtilsService = void 0;
const user_response_dto_1 = require("../../../common/dto/user-response.dto");
const env_enum_1 = require("../../../common/enum/env.enum");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const class_transformer_1 = require("class-transformer");
const crypto_1 = require("crypto");
let AuthUtilsService = class AuthUtilsService {
    jwtService;
    configService;
    prisma;
    saltRounds = 10;
    refreshTokenDays = 30;
    refreshTokenLength = 32;
    constructor(jwtService, configService, prisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
    }
    async sanitizeUser(user) {
        if (!user)
            return null;
        const profilePictureUrl = user?.profilePicture
            ? typeof user.profilePicture === 'string'
                ? user.profilePicture
                : (user.profilePicture.url ?? null)
            : null;
        const flatData = {
            ...user,
            profilePictureUrl,
        };
        return (0, class_transformer_1.plainToInstance)(user_response_dto_1.UserResponseDto, flatData, {
            excludeExtraneousValues: true,
        });
    }
    generateToken(payload) {
        const token = this.jwtService.sign(payload, {
            secret: this.configService.getOrThrow(env_enum_1.ENVEnum.JWT_SECRET),
            expiresIn: this.configService.getOrThrow(env_enum_1.ENVEnum.JWT_EXPIRES_IN),
        });
        return token;
    }
    async generateTokenPairAndSave(payload) {
        const accessToken = this.generateToken(payload);
        const refreshToken = (0, crypto_1.randomBytes)(Math.max(32, Math.floor(this.refreshTokenLength / 2))).toString('hex');
        const refreshTokenExpiresAt = new Date(Date.now() + this.refreshTokenDays * 24 * 60 * 60 * 1000);
        await this.prisma.client.refreshToken.create({
            data: {
                token: refreshToken,
                userId: payload.sub,
                expiresAt: refreshTokenExpiresAt,
            },
        });
        return {
            accessToken,
            refreshToken,
            refreshTokenExpiresAt,
        };
    }
    verifyToken(token) {
        const secret = this.configService.getOrThrow(env_enum_1.ENVEnum.JWT_SECRET);
        try {
            return this.jwtService.verify(token, { secret });
        }
        catch (err) {
            console.error(err);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    decodeToken(token) {
        return this.jwtService.decode(token);
    }
    async revokeRefreshToken(token) {
        await this.prisma.client.refreshToken.deleteMany({ where: { token } });
    }
    async revokeAllRefreshTokensForUser(userId) {
        await this.prisma.client.refreshToken.deleteMany({ where: { userId } });
    }
    async findRefreshToken(token) {
        return this.prisma.client.refreshToken.findUnique({ where: { token } });
    }
    generateOtpAndExpiry(minutes = 5) {
        const otp = (0, crypto_1.randomInt)(1000, 10000);
        const expiryTime = new Date(Date.now() + minutes * 60 * 1000);
        return { otp, expiryTime };
    }
    async generateOTPAndSave(userId, type) {
        const { otp, expiryTime } = this.generateOtpAndExpiry();
        const hashedOtp = await this.hash(otp.toString());
        await this.prisma.client.userOtp.create({
            data: {
                userId,
                code: hashedOtp,
                type,
                expiresAt: expiryTime,
            },
        });
        return otp;
    }
    async getSanitizedUserById(id) {
        const user = await this.prisma.client.user.findUniqueOrThrow({
            where: { id },
        });
        return this.sanitizeUser(user);
    }
    async getUserByEmail(email) {
        const user = await this.prisma.client.user.findUnique({
            where: { email },
        });
        if (!user)
            return null;
        return this.sanitizeUser(user);
    }
    async hash(value) {
        return bcrypt.hash(value, this.saltRounds);
    }
    async compare(value, hash) {
        return bcrypt.compare(value, hash);
    }
};
exports.AuthUtilsService = AuthUtilsService;
exports.AuthUtilsService = AuthUtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthUtilsService);
//# sourceMappingURL=auth-utils.service.js.map