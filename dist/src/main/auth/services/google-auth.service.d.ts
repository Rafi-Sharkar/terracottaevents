import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { GoogleAuthDto } from '../dto/google-auth.dto';
import { PrismaService } from '../../../lib/prisma/prisma.service';
export declare class GoogleAuthService {
    private readonly authUtils;
    private readonly prisma;
    constructor(authUtils: AuthUtilsService, prisma: PrismaService);
    googleLogin(dto: GoogleAuthDto): Promise<import("@/common/utils/response.util").TResponse<{
        user: import("../../../common/dto/user-response.dto").UserResponseDto;
        token: import("../../../core/jwt/jwt.interface").TokenPair;
    }>>;
    private upsertFromFirebase;
    findByGoogleId(googleId: string): Promise<any | null>;
}
