"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TwilioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const env_enum_1 = require("../../common/enum/env.enum");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const twilio_1 = require("twilio");
let TwilioService = TwilioService_1 = class TwilioService {
    config;
    twilio;
    fromPhone;
    logger = new common_1.Logger(TwilioService_1.name);
    constructor(config) {
        this.config = config;
    }
    initializeTwilio() {
        if (!this.twilio) {
            const accountSid = this.config.get(env_enum_1.ENVEnum.TWILIO_ACCOUNT_SID);
            const authToken = this.config.get(env_enum_1.ENVEnum.TWILIO_AUTH_TOKEN);
            const phoneNumber = this.config.get(env_enum_1.ENVEnum.TWILIO_PHONE_NUMBER);
            if (!accountSid || !authToken || !phoneNumber) {
                throw new Error('Twilio credentials are not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in .env');
            }
            this.twilio = new twilio_1.Twilio(accountSid, authToken);
            this.fromPhone = phoneNumber;
        }
    }
    async sendSms(to, title, body) {
        this.initializeTwilio();
        const formattedTo = to.startsWith('+') ? to : `+${to}`;
        const fullBody = `${title}\n\n${body}`;
        try {
            const result = await this.twilio.messages.create({
                body: fullBody,
                from: this.fromPhone,
                to: formattedTo,
            });
            this.logger.log(`SMS sent successfully. SID: ${result.sid}`);
        }
        catch (error) {
            this.logger.error(`Failed to send SMS to ${formattedTo}: ${error.message}`);
            throw error;
        }
    }
    async sendOtpSms(to, otp) {
        const body = `Your GalaxyBooking verification code is ${otp}. It expires in 10 minutes. Do not share this code with anyone.`;
        await this.sendSms(to, 'GalaxyBooking Verification', body);
    }
};
exports.TwilioService = TwilioService;
exports.TwilioService = TwilioService = TwilioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TwilioService);
//# sourceMappingURL=twilio.service.js.map