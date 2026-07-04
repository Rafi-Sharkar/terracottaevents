export declare class ChangePasswordDto {
    password?: string;
    newPassword: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    otp: string;
    email: string;
    newPassword: string;
}
