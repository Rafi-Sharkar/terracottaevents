import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BillingCycle } from '@prisma';

export class CreatePlanDto {
  @ApiProperty({ example: 'Gold Plan', description: 'Name of the plan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '$99.99', description: 'Price of the plan' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: false, description: 'Is this the most popular plan?', required: false })
  @IsBoolean()
  @IsOptional()
  isMostPopular?: boolean;

  @ApiProperty({
    example: 'MONTHLY',
    enum: ['ONE_TIME', 'MONTHLY', 'YEARLY'],
    description: 'Billing cycle of the plan',
  })
  @IsEnum(['ONE_TIME', 'MONTHLY', 'YEARLY'])
  @IsOptional()
  BillingCycle?: BillingCycle;

  @ApiProperty({
    example: ['benefit-uuid-1', 'benefit-uuid-2'],
    description: 'List of benefit IDs associated with the plan',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefitIds?: string[];
}

export class CreateBenefitDto {
  @ApiProperty({ example: '24/7 Priority Support', description: 'Name of the benefit' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
