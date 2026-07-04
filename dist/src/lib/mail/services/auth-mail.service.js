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
exports.AuthMailService = void 0;
const common_1 = require("@nestjs/common");
const he = __importStar(require("he"));
const mail_service_1 = require("../mail.service");
const otp_template_1 = require("../templates/otp.template");
const reset_password_confirm_template_1 = require("../templates/reset-password-confirm.template");
let AuthMailService = class AuthMailService {
    mailService;
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendEmail(to, subject, html, text) {
        return this.mailService.sendMail({ to, subject, html, text });
    }
    sanitize(input) {
        return he.encode(input);
    }
    async sendVerificationCodeEmail(to, code, options = {}) {
        const message = this.sanitize(options.message || 'Verify your account');
        const safeCode = this.sanitize(code);
        const subject = options.subject || 'Verification Code';
        return this.sendEmail(to, subject, (0, otp_template_1.otpTemplate)({
            title: 'Verify Your Account',
            message,
            code: safeCode,
            footer: 'If you did not request this code, you can safely ignore this email.',
            logoUrl: process.env.LOGO_URL ||
                'https://via.placeholder.com/150x50/0A0E27/E8B923?text=GalaxyBooking',
        }), `${message}\nYour verification code: ${code}`);
    }
    async sendResetPasswordCodeEmail(to, code, options = {}) {
        const message = this.sanitize(options.message || 'Password Reset Request');
        const safeCode = this.sanitize(code);
        const subject = options.subject || 'Password Reset Code';
        return this.sendEmail(to, subject, (0, otp_template_1.otpTemplate)({
            title: 'Password Reset Request',
            message,
            code: safeCode,
            footer: 'If you did not request a password reset, you can safely ignore this email.',
            logoUrl: process.env.LOGO_URL ||
                'https://via.placeholder.com/150x50/0A0E27/E8B923?text=GalaxyBooking',
        }), `${message}\nYour password reset code: ${code}\n\nIf you did not request this, please ignore this email.`);
    }
    async sendPasswordResetConfirmationEmail(to, options = {}) {
        const message = this.sanitize(options.message || 'Your password has been successfully updated.');
        const subject = options.subject || 'Password Reset Confirmation';
        return this.sendEmail(to, subject, (0, reset_password_confirm_template_1.passwordResetConfirmationTemplate)(message, this.mailService.getLogoUrl()), message);
    }
};
exports.AuthMailService = AuthMailService;
exports.AuthMailService = AuthMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], AuthMailService);
//# sourceMappingURL=auth-mail.service.js.map