import { ConfigService } from '@nestjs/config';
export declare class TwilioService {
    private readonly config;
    private twilio;
    private fromPhone;
    private readonly logger;
    constructor(config: ConfigService);
    private initializeTwilio;
    sendSms(to: string, title: string, body: string): Promise<void>;
    sendOtpSms(to: string, otp: number): Promise<void>;
}
