import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
export declare class MailService {
    private configService;
    private transporter;
    private fromEmail;
    private logoUrl;
    constructor(configService: ConfigService);
    sendMail({ to, subject, html, text, }: {
        to: string;
        subject: string;
        html: string;
        text: string;
    }): Promise<nodemailer.SentMessageInfo>;
    getLogoUrl(): string;
}
export declare const otpTemplate: ({ title, message, code, footer, logoUrl, }: {
    title: string;
    message: string;
    code: string;
    footer: string;
    logoUrl: string;
}) => string;
export declare const passwordResetConfirmationTemplate: (message: string, logoUrl: string) => string;
export declare const passwordResetLinkTemplate: ({ resetUrl, logoUrl, }: {
    resetUrl: string;
    logoUrl: string;
}) => string;
