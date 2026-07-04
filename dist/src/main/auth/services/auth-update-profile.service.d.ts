import { PrismaService } from "../../../lib/prisma/prisma.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { UpdateProfileDto } from '../dto/update-profile.dto';
export declare class AuthUpdateProfileService {
    private readonly prisma;
    private readonly authUtils;
    constructor(prisma: PrismaService, authUtils: AuthUtilsService);
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<import("@/common/utils/response.util").TResponse<import("../../../common/dto/user-response.dto").UserResponseDto>>;
    deleteProfile(userId: string): Promise<import("@/common/utils/response.util").TResponse<null>>;
}
