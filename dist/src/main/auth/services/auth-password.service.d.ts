import { TResponse } from "../../../common/utils/response.util";
import { AuthMailService } from "../../../lib/mail/services/auth-mail.service";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { ChangePasswordDto, ResetPasswordDto } from '../dto/password.dto';
export declare class AuthPasswordService {
    private readonly prisma;
    private readonly utils;
    private readonly mailService;
    constructor(prisma: PrismaService, utils: AuthUtilsService, mailService: AuthMailService);
    changePassword(userId: string, dto: ChangePasswordDto): Promise<TResponse<any>>;
    forgotPassword(email: string): Promise<TResponse<any>>;
    resetPassword(dto: ResetPasswordDto): Promise<TResponse<any>>;
}
