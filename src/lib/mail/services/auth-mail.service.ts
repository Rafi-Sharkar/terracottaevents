import { Injectable } from '@nestjs/common';
import * as he from 'he';
import * as nodemailer from 'nodemailer';
import { MailService } from '../mail.service';
import { otpTemplate } from '../templates/otp.template';
import { passwordResetConfirmationTemplate } from '../templates/reset-password-confirm.template';

interface EmailOptions {
  subject?: string;
  message?: string;
}

@Injectable()
export class AuthMailService {
  constructor(private readonly mailService: MailService) {}

  private async sendEmail(
    to: string,
    subject: string,
    html: string,
    text: string,
  ): Promise<nodemailer.SentMessageInfo> {
    return this.mailService.sendMail({ to, subject, html, text });
  }

  private sanitize(input: string): string {
    return he.encode(input);
  }

  async sendVerificationCodeEmail(
    to: string,
    code: string,
    options: EmailOptions = {},
  ): Promise<nodemailer.SentMessageInfo> {
    const message = this.sanitize(options.message || 'Verify your account');
    const safeCode = this.sanitize(code);
    const subject = options.subject || 'Verification Code';

    return this.sendEmail(
      to,
      subject,
      otpTemplate({
        title: 'Verify Your Account',
        message,
        code: safeCode,
        footer:
          'If you did not request this code, you can safely ignore this email.',
        logoUrl:
          process.env.LOGO_URL ||
          'https://via.placeholder.com/150x50/0A0E27/E8B923?text=GalaxyBooking',
      }),
      `${message}\nYour verification code: ${code}`,
    );
  }

  async sendResetPasswordCodeEmail(
    to: string,
    code: string,
    options: EmailOptions = {},
  ): Promise<nodemailer.SentMessageInfo> {
    const message = this.sanitize(options.message || 'Password Reset Request');
    const safeCode = this.sanitize(code);
    const subject = options.subject || 'Password Reset Code';

    return this.sendEmail(
      to,
      subject,
      otpTemplate({
        title: 'Password Reset Request',
        message,
        code: safeCode,
        footer:
          'If you did not request a password reset, you can safely ignore this email.',
        logoUrl:
          process.env.LOGO_URL ||
          'https://via.placeholder.com/150x50/0A0E27/E8B923?text=GalaxyBooking',
      }),
      `${message}\nYour password reset code: ${code}\n\nIf you did not request this, please ignore this email.`,
    );
  }

  async sendPasswordResetConfirmationEmail(
    to: string,
    options: EmailOptions = {},
  ): Promise<nodemailer.SentMessageInfo> {
    const message = this.sanitize(
      options.message || 'Your password has been successfully updated.',
    );
    const subject = options.subject || 'Password Reset Confirmation';

    return this.sendEmail(
      to,
      subject,
      passwordResetConfirmationTemplate(message, this.mailService.getLogoUrl()),
      message,
    );
  }
}
