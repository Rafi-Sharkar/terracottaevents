import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SubscribeUserDto {
  @ApiProperty({
    description: 'The ID of the plan to subscribe to',
    example: 'plan-uuid',
  })
  @IsString()
  @IsNotEmpty()
  planId: string;
}
