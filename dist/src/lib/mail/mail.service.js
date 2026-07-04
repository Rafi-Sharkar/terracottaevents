"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetLinkTemplate = exports.passwordResetConfirmationTemplate = exports.otpTemplate = exports.MailService = void 0;
const env_enum_1 = require("../../common/enum/env.enum");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let MailService = class MailService {
    configService;
    transporter;
    fromEmail;
    logoUrl;
    constructor(configService) {
        this.configService = configService;
        const user = this.configService.getOrThrow(env_enum_1.ENVEnum.MAIL_USER);
        const pass = this.configService.getOrThrow(env_enum_1.ENVEnum.MAIL_PASS);
        this.logoUrl = this.configService.getOrThrow(env_enum_1.ENVEnum.logo_URL);
        this.fromEmail = user;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass },
        });
    }
    async sendMail({ to, subject, html, text, }) {
        return this.transporter.sendMail({
            from: `"Centrum Hall Booking" <${this.fromEmail}>`,
            to,
            subject,
            html,
            text,
        });
    }
    getLogoUrl() {
        return this.logoUrl;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
const headerBlock = (logoUrl) => `
  <div style="background-color:#0A0E27; padding:22px 0; border-radius:12px 12px 0 0;">
    <div style="text-align:center;">
      <img
        src="${logoUrl}"
        alt="GalaxyBooking"
        style="max-height:38px; width:auto;"
      />
    </div>
  </div>
`;
const footerBlock = (footerText) => `
  <div style="background-color:#1A1F3A; padding:20px 28px; border-radius:0 0 12px 12px; text-align:center;">
    <p style="margin:0; font-size:13px; color:#A0A8B8; font-family:'Segoe UI',Arial,sans-serif; line-height:1.5;">
      ${footerText}
    </p>
  </div>
`;
const wrap = (innerHtml) => `
<div style="font-family:'Segoe UI',Arial,sans-serif; background-color:#0f1220; min-height:100%; padding:36px 16px; margin:0; box-sizing:border-box;">
  <div style="max-width:560px; margin:0 auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.35);">
    ${innerHtml}
  </div>
</div>
`;
const otpTemplate = ({ title, message, code, footer, logoUrl, }) => wrap(`
  ${headerBlock(logoUrl)}

  <!-- Body -->
  <div style="background-color:#ffffff; padding:36px 32px 28px;">

    <!-- Title -->
    <h2 style="margin:0 0 16px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27; font-family:'Segoe UI',Arial,sans-serif;">
      ${title}
    </h2>

    <!-- Divider accent -->
    <div style="width:48px; height:3px; background-color:#E8B923; margin:0 auto 22px; border-radius:2px;"></div>

    <!-- Message -->
    <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 28px; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
      ${message}
    </p>

    <!-- OTP Box -->
    <div style="background-color:#0A0E27; border-radius:10px; padding:24px 16px; text-align:center; margin-bottom:24px;">
      <p style="margin:0 0 6px; font-size:13px; color:#A0A8B8; text-transform:uppercase; letter-spacing:1.4px; font-family:'Segoe UI',Arial,sans-serif;">
        Your Verification Code
      </p>
      <p style="margin:0; font-size:36px; font-weight:700; color:#E8B923; letter-spacing:10px; font-family:'Courier New',monospace;">
        ${code}
      </p>
    </div>

    <!-- Expiry note -->
    <p style="font-size:13px; color:#A0A8B8; text-align:center; margin:0; font-family:'Segoe UI',Arial,sans-serif; line-height:1.5;">
      This code expires in <strong style="color:#6B7280;">10 minutes</strong>. Do not share it with anyone.
    </p>
  </div>

  ${footerBlock(footer)}
`);
exports.otpTemplate = otpTemplate;
const passwordResetConfirmationTemplate = (message, logoUrl) => wrap(`
  ${headerBlock(logoUrl)}

  <!-- Body -->
  <div style="background-color:#ffffff; padding:36px 32px 28px;">

    <!-- Success Icon Circle -->
    <div style="text-align:center; margin-bottom:20px;">
      <div style="display:inline-block; width:64px; height:64px; border-radius:50%; background-color:#ecfdf5; border:3px solid #10B981; line-height:58px;">
        <span style="font-size:28px; color:#10B981;">&#10003;</span>
      </div>
    </div>

    <!-- Title -->
    <h2 style="margin:0 0 12px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27; font-family:'Segoe UI',Arial,sans-serif;">
      Password Reset Successful
    </h2>

    <!-- Divider accent -->
    <div style="width:48px; height:3px; background-color:#10B981; margin:0 auto 22px; border-radius:2px;"></div>

    <!-- Message -->
    <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
      ${message}
    </p>

    <!-- Security Warning Box -->
    <div style="background-color:#fef2f2; border-left:4px solid #EF4444; border-radius:6px; padding:14px 18px; margin-bottom:8px;">
      <p style="margin:0; font-size:13px; color:#EF4444; line-height:1.6; font-family:'Segoe UI',Arial,sans-serif;">
        <strong>Security Notice:</strong> If you did not initiate this change, please reset your password immediately and contact our support team.
      </p>
    </div>
  </div>

  ${footerBlock('Need help? Contact our support team at <a href="mailto:terracottacreationbd@gmail.com" style="color:#E8B923; text-decoration:none;">terracottacreationbd@gmail.com</a>')}
`);
exports.passwordResetConfirmationTemplate = passwordResetConfirmationTemplate;
const passwordResetLinkTemplate = ({ resetUrl, logoUrl, }) => wrap(`
  ${headerBlock(logoUrl)}

  <!-- Body -->
  <div style="background-color:#ffffff; padding:36px 32px 28px;">

    <!-- Title -->
    <h2 style="margin:0 0 16px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27; font-family:'Segoe UI',Arial,sans-serif;">
      Reset Your Password
    </h2>

    <!-- Divider accent -->
    <div style="width:48px; height:3px; background-color:#E8B923; margin:0 auto 22px; border-radius:2px;"></div>

    <!-- Message -->
    <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 28px; text-align:center; font-family:'Segoe UI',Arial,sans-serif;">
      We received a request to reset your password. Click the button below to create a new one.
    </p>

    <!-- CTA Button -->
    <div style="text-align:center; margin-bottom:24px;">
      <a
        href="${resetUrl}"
        style="display:inline-block; background-color:#0A0E27; color:#E8B923; font-size:15px; font-weight:600; padding:14px 36px; border-radius:8px; text-decoration:none; font-family:'Segoe UI',Arial,sans-serif; letter-spacing:0.5px;"
      >
        Reset Password
      </a>
    </div>

    <!-- Fallback link -->
    <p style="font-size:13px; color:#A0A8B8; text-align:center; margin:0; font-family:'Segoe UI',Arial,sans-serif; line-height:1.6;">
      If the button doesn't work, copy and paste the link below:<br/>
      <a href="${resetUrl}" style="color:#E8B923; text-decoration:none; word-break:break-all; font-size:12px;">${resetUrl}</a>
    </p>

    <!-- Expiry note -->
    <p style="font-size:13px; color:#A0A8B8; text-align:center; margin:16px 0 0; font-family:'Segoe UI',Arial,sans-serif;">
      This link expires in <strong style="color:#6B7280;">1 hour</strong>.
    </p>
  </div>

  ${footerBlock('If you did not request a password reset, you can safely ignore this email.<br/><a href="mailto:terracottacreationbd@gmail.com" style="color:#E8B923; text-decoration:none;">Contact Support</a>')}
`);
exports.passwordResetLinkTemplate = passwordResetLinkTemplate;
//# sourceMappingURL=mail.service.js.map