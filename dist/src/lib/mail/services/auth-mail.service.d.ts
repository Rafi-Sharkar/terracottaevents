import * as nodemailer from 'nodemailer';
import { MailService } from '../mail.service';
interface EmailOptions {
    subject?: string;
    message?: string;
}
export declare class AuthMailService {
    private readonly mailService;
    constructor(mailService: MailService);
    private sendEmail;
    private sanitize;
    sendVerificationCodeEmail(to: string, code: string, options?: EmailOptions): Promise<nodemailer.SentMessageInfo>;
    sendResetPasswordCodeEmail(to: string, code: string, options?: EmailOptions): Promise<nodemailer.SentMessageInfo>;
    sendPasswordResetConfirmationEmail(to: string, options?: EmailOptions): Promise<nodemailer.SentMessageInfo>;
}
export {};
