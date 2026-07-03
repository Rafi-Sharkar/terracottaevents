import { ENVEnum } from '@/common/enum/env.enum';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private twilio: Twilio;
  private fromPhone: string;
  private readonly logger = new Logger(TwilioService.name);

  constructor(private readonly config: ConfigService) {}

  private initializeTwilio(): void {
    if (!this.twilio) {
      const accountSid = this.config.get(ENVEnum.TWILIO_ACCOUNT_SID);
      const authToken = this.config.get(ENVEnum.TWILIO_AUTH_TOKEN);
      const phoneNumber = this.config.get(ENVEnum.TWILIO_PHONE_NUMBER);

      if (!accountSid || !authToken || !phoneNumber) {
        throw new Error(
          'Twilio credentials are not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in .env',
        );
      }

      this.twilio = new Twilio(accountSid, authToken);
      this.fromPhone = phoneNumber;
    }
  }

  // ─────────────────────────────────────────────
  // Send a raw SMS
  // ─────────────────────────────────────────────
  async sendSms(to: string, title: string, body: string): Promise<void> {
    this.initializeTwilio();

    // Ensure international format
    const formattedTo = to.startsWith('+') ? to : `+${to}`;

    const fullBody = `${title}\n\n${body}`;

    try {
      // ← renamed from `message` to `result` — was shadowing the `message` param
      const result = await this.twilio.messages.create({
        body: fullBody,
        from: this.fromPhone,
        to: formattedTo,
      });

      this.logger.log(`SMS sent successfully. SID: ${result.sid}`);
    } catch (error) {
      this.logger.error(
        `Failed to send SMS to ${formattedTo}: ${error.message}`,
      );
      throw error; // ← re-throw so the caller can handle / clean up
    }
  }

  // ─────────────────────────────────────────────
  // Send OTP SMS (single entry-point — removed the identical duplicate)
  // ─────────────────────────────────────────────
  async sendOtpSms(to: string, otp: number): Promise<void> {
    const body = `Your GalaxyBooking verification code is ${otp}. It expires in 10 minutes. Do not share this code with anyone.`;
    await this.sendSms(to, 'GalaxyBooking Verification', body);
  }
}
