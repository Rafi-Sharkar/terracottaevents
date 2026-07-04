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
exports.GoogleAuthService = void 0;
const response_util_1 = require("../../../common/utils/response.util");
const auth_utils_service_1 = require("../../../lib/utils/services/auth-utils.service");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const firebase_config_1 = require("../../../lib/firebase/firebase.config");
let GoogleAuthService = class GoogleAuthService {
    authUtils;
    prisma;
    constructor(authUtils, prisma) {
        this.authUtils = authUtils;
        this.prisma = prisma;
    }
    async googleLogin(dto) {
        let decoded;
        try {
            decoded = await (0, firebase_config_1.getFirebaseAdmin)().auth().verifyIdToken(dto.idToken);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Firebase ID token');
        }
        const googleId = decoded.uid;
        const email = decoded.email || '';
        const name = decoded.name || email.split('@')[0];
        const picture = decoded.picture || null;
        const user = await this.upsertFromFirebase({
            googleId,
            email,
            name,
            picture,
        });
        const token = await this.authUtils.generateTokenPairAndSave({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return (0, response_util_1.successResponse)({
            user: await this.authUtils.sanitizeUser(user),
            token,
        }, 'Google login successful');
    }
    async upsertFromFirebase(data) {
        return this.prisma.client.user.upsert({
            where: { email: data.email },
            update: {
                googleId: data.googleId,
            },
            create: {
                email: data.email,
                googleId: data.googleId,
                name: data.name,
                password: '',
                authProvider: 'GOOGLE',
                profilePicture: data.picture,
                isVerified: true,
            },
        });
    }
    async findByGoogleId(googleId) {
        return this.prisma.client.user.findUnique({ where: { googleId } });
    }
};
exports.GoogleAuthService = GoogleAuthService;
exports.GoogleAuthService = GoogleAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_utils_service_1.AuthUtilsService,
        prisma_service_1.PrismaService])
], GoogleAuthService);
//# sourceMappingURL=google-auth.service.js.map