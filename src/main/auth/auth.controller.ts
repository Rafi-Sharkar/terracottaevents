import { GetUser, ValidateAuth } from '@/core/jwt/jwt.decorator';

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authRegisterService: AuthRegisterService,
    private readonly authLoginService: AuthLoginService,
    private readonly authLogoutService: AuthLogoutService,
    private readonly authOtpService: AuthOtpService,
    private readonly authPasswordService: AuthPasswordService,
    private readonly authGetProfileService: AuthGetProfileService,
    private readonly authUpdateProfileService: AuthUpdateProfileService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  // --------------------- Registration ---------------------
  @ApiOperation({ summary: 'User Registration with Email' })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authRegisterService.register(body);
  }

  // --------------------- Verify OTP ---------------------
  @ApiOperation({ summary: 'Verify OTP after Registration or Login' })
  @Post('verify-otp')
  async verifyEmail(@Body() body: VerifyOTPDto) {
    return this.authOtpService.verifyOTP(body);
  }
  // // --------------------- Verify Phone OTP ---------------------
  // @ApiOperation({ summary: 'Verify OTP for Phone Number' })
  // @Post('verify-phone-otp')
  // async verifyPhoneOtp(@Body() body: VerifyPhoneOtpDto) {
  //   return this.authOtpService.verifyPhoneOtp(body);
  // }
  // // --------------------- Resend OTP ---------------------
  // @ApiOperation({ summary: 'Resend OTP to Email' })
  // @Post('resend-otp')
  // async resendOtp(@Body() body: ResendOtpDto) {
  //   return this.authOtpService.resendOtp(body);
  // }
  // // -------Resend OTP to Mobile-------
  // @ApiOperation({ summary: 'Resend OTP to Phone Number' })
  // @Post('resend-phone-otp')
  // async resendPhoneOtp(@Body() body: ResetPhoneOtpDto) {
  //   return this.authOtpService.resendPhoneOtp(body);
  // }
  // // --------------------- Login ---------------------
  @ApiOperation({ summary: 'User Login' })
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = (await this.authLoginService.login(body)) as any;
    //------- Set HTTP-only cookie---------
    res.cookie('token', result?.data?.token?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { result, message: 'Login successful' };
  }

  @ApiOperation({ summary: 'Google Sign-In with Firebase' })
  @Post('google')
  async googleLogin(
    @Body() dto: GoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = (await this.googleAuthService.googleLogin(dto)) as any;
    return { result, message: 'Google login successful' };
  }

  @ApiOperation({ summary: 'User Logout' })
  @ApiBearerAuth()
  @Post('logout')
  @ValidateAuth()
  async logOut(@GetUser('sub') userId: string, @Body() dto: LogoutDto) {
    return this.authLogoutService.logout(userId, dto);
  }

  @Post('refresh')
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authLogoutService.refresh(dto);
    return { result, message: 'Login successful' };
  }

  // @ApiOperation({ summary: 'Change Password' })
  // @ApiBearerAuth()
  // @Post('password/change')
  // @ValidateAuth()
  // async changePassword(
  //   @GetUser('sub') userId: string,
  //   @Body() body: ChangePasswordDto,
  // ) {
  //   return this.authPasswordService.changePassword(userId, body);
  // }
  // // --------------------- forgot password ---------------------
  // @ApiOperation({ summary: 'Forgot Password' })
  // @Post('password/forgot')
  // async forgotPassword(@Body() body: ForgotPasswordDto) {
  //   return this.authPasswordService.forgotPassword(body.email);
  // }
  // // --------------------- reset password ---------------------
  // @ApiOperation({ summary: 'Reset Password' })
  // @Post('password/reset')
  // async resetPassword(@Body() body: ResetPasswordDto) {
  //   return this.authPasswordService.resetPassword(body);
  // }

  // --------------------- Get profile ---------------------
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiBearerAuth()
  @Get('profile')
  @ValidateAuth()
  async getProfile(@GetUser('sub') userId: string) {
    return this.authGetProfileService.getProfile(userId);
  }

  // --------------------- Update profile ---------------------
  @ApiOperation({ summary: 'Update profile' })
  @ApiBearerAuth()
  @Patch('profile')
  @ValidateAuth()
  @ApiConsumes('application/json')
  @UseInterceptors(AnyFilesInterceptor())
  update(@GetUser('sub') id: string, @Body() dto: UpdateProfileDto) {
    return this.authUpdateProfileService.updateProfile(id, dto);
  }
  // --------------------- Delete profile ---------------------
  @ApiOperation({ summary: 'Delete profile and all related data' })
  @ApiBearerAuth()
  @Delete('profile')
  @ValidateAuth()
  deleteProfile(@GetUser('sub') id: string) {
    return this.authUpdateProfileService.deleteProfile(id);
  }
}
