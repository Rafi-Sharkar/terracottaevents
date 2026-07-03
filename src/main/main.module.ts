import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload-s3/upload.module';
import { VpsFileUploadModule } from './vps-fileupload/vps-fileupload.module';
import { DevModule } from './dev/dev.module';
import { PlanModule } from './plan/plan.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AuthModule,
    UploadModule,
    VpsFileUploadModule,
    DevModule,
    PlanModule,
    BookingModule,
  ],
})
export class MainModule {}
