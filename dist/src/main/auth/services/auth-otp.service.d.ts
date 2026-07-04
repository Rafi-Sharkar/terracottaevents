import { TResponse } from "../../../common/utils/response.util";
import { AuthMailService } from "../../../lib/mail/services/auth-mail.service";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { TwilioService } from "../../../lib/twilio/twilio.service";
import { AuthUtilsService } from "../../../lib/utils/services/auth-utils.service";
import { OtpType } from "../../../../prisma/generated/client";
import { ResendOtpDto, ResetPhoneOtpDto, VerifyOTPDto, VerifyPhoneOtpDto } from '../dto/otp.dto';
export declare class AuthOtpService {
    private readonly prisma;
    private readonly utils;
    private readonly authMailService;
    private readonly twilioService;
    constructor(prisma: PrismaService, utils: AuthUtilsService, authMailService: AuthMailService, twilioService: TwilioService);
    resendOtp({ email, type }: ResendOtpDto): Promise<TResponse<any>>;
    verifyOTP(dto: VerifyOTPDto, type?: OtpType): Promise<TResponse<any>>;
    verifyPhoneOtp(dto: VerifyPhoneOtpDto): Promise<TResponse<any>>;
    resendPhoneOtp(dto: ResetPhoneOtpDto): Promise<TResponse<any>>;
}
