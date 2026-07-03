import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { BookingStatus, PaymentMethod } from '@prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateBookingDto {
  @ApiProperty({ example: 'plan-uuid-here', description: 'ID of the plan being booked' })
  @IsString()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    example: 'BKASH',
    enum: ['PHYSICAL', 'BKASH', 'NAGAD', 'BANK_TRANSACTION'],
    description: 'Method used for payment',
  })
  @IsEnum(['PHYSICAL', 'BKASH', 'NAGAD', 'BANK_TRANSACTION'])
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 25, description: 'Discount percentage (e.g. 25 for 25%)', required: false, default: 0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount?: number;
}

export class SubmitPaymentDto {
  @ApiProperty({ example: 'TXN123456', description: 'Transaction ID based on PaymentMethod' })
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}


export class UpdateBookingStatusDto {
  @ApiProperty({
    example: 'PAID',
    enum: [
      'PENDING',
      'PAID',
      'NOT_PAID',
      'PAYMENT_CONFIRM',
      'PAYMENT_FAILED',
      'CHECK_IN_COMPLETED',
      'CHECK_OUT_COMPLETED',
    ],
    description: 'Updated booking status',
  })
  @IsEnum([
    'PENDING',
    'PAID',
    'NOT_PAID',
    'PAYMENT_CONFIRM',
    'PAYMENT_FAILED',
    'CHECK_IN_COMPLETED',
    'CHECK_OUT_COMPLETED',
  ])
  @IsNotEmpty()
  status: BookingStatus;
}

export class GetBookingsQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: BookingStatus,
    description: 'Filter bookings by status',
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}

