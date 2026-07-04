import { TResponse } from "../../../common/utils/response.util";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { LoginDto } from '../dto/login.dto';
export declare class AuthLoginService {
    private readonly prisma;
    private readonly utils;
    constructor(prisma: PrismaService, utils: AuthUtilsService);
    login(dto: LoginDto): Promise<TResponse<any>>;
}
