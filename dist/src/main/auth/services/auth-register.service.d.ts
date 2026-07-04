import { TResponse } from "../../../common/utils/response.util";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { RegisterDto } from '../dto/register.dto';
export declare class AuthRegisterService {
    private readonly prisma;
    private readonly utils;
    constructor(prisma: PrismaService, utils: AuthUtilsService);
    register(dto: RegisterDto): Promise<TResponse<any>>;
}
