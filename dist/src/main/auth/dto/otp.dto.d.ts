import { OtpType } from "../../../../prisma/generated/client";
export declare class ResendOtpDto {
    email: string;
    type: OtpType;
}
export declare class VerifyOTPDto {
    otp: string;
    email: string;
}
export declare class VerifyPhoneOtpDto {
    otp: string;
    phoneNumber: string;
}
export declare class ResetPhoneOtpDto {
    phoneNumber: string;
    type: OtpType;
}
