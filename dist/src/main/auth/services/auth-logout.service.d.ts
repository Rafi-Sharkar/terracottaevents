import { TResponse } from "../../../common/utils/response.util";
import { TokenPair } from "../../../core/jwt/jwt.interface";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { LogoutDto, RefreshTokenDto } from '../dto/logout.dto';
export declare class AuthLogoutService {
    private readonly prisma;
    private readonly utils;
    constructor(prisma: PrismaService, utils: AuthUtilsService);
    logout(userId: string, dto: LogoutDto): Promise<TResponse<any>>;
    refresh(dto: RefreshTokenDto): Promise<TResponse<TokenPair>>;
}
