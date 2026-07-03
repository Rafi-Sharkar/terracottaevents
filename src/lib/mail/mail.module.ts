import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthMailService } from './services/auth-mail.service';
import { BookingMailService } from './services/booking-mail.service';

@Global()
@Module({
  providers: [MailService, AuthMailService, BookingMailService],
  exports: [AuthMailService, BookingMailService],
})
export class MailModule {}
