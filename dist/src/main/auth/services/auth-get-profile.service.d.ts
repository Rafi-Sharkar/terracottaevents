import { TResponse } from "../../../common/utils/response.util";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
export declare class AuthGetProfileService {
    private readonly prisma;
    private readonly authUtils;
    constructor(prisma: PrismaService, authUtils: AuthUtilsService);
    getProfile(userId: string): Promise<TResponse<any>>;
    private findUserBy;
}
