import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class AddTokensDto {
  @ApiProperty({
    description: 'The number of tokens to add to the user',
    example: 10,
  })
  @IsNumber()
  @Min(1)
  tokens: number;
}
