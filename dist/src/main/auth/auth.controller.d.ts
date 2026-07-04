import { Response } from 'express';
import { LogoutDto, RefreshTokenDto } from './dto/logout.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGetProfileService } from './services/auth-get-profile.service';
import { AuthLoginService } from './services/auth-login.service';
import { AuthLogoutService } from './services/auth-logout.service';
import { AuthOtpService } from './services/auth-otp.service';
import { AuthPasswordService } from './services/auth-password.service';
import { AuthRegisterService } from './services/auth-register.service';
import { AuthUpdateProfileService } from './services/auth-update-profile.service';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOTPDto } from './dto/otp.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authRegisterService;
    private readonly authLoginService;
    private readonly authLogoutService;
    private readonly authOtpService;
    private readonly authPasswordService;
    private readonly authGetProfileService;
    private readonly authUpdateProfileService;
    private readonly googleAuthService;
    constructor(authRegisterService: AuthRegisterService, authLoginService: AuthLoginService, authLogoutService: AuthLogoutService, authOtpService: AuthOtpService, authPasswordService: AuthPasswordService, authGetProfileService: AuthGetProfileService, authUpdateProfileService: AuthUpdateProfileService, googleAuthService: GoogleAuthService);
    register(body: RegisterDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    verifyEmail(body: VerifyOTPDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    login(body: LoginDto, res: Response): Promise<{
        result: any;
        message: string;
    }>;
    googleLogin(dto: GoogleAuthDto, res: Response): Promise<{
        result: any;
        message: string;
    }>;
    logOut(userId: string, dto: LogoutDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    refresh(dto: RefreshTokenDto, res: Response): Promise<{
        result: import("../../common/utils/response.util").TResponse<import("../../core/jwt/jwt.interface").TokenPair>;
        message: string;
    }>;
    getProfile(userId: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    update(id: string, dto: UpdateProfileDto): Promise<import("../../common/utils/response.util").TResponse<import("../../common/dto/user-response.dto").UserResponseDto>>;
    deleteProfile(id: string): Promise<import("../../common/utils/response.util").TResponse<null>>;
}
