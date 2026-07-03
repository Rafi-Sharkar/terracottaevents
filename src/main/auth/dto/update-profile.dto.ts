import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'John', description: 'Optional name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Singer', description: 'Optional title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    description: 'Optional profile photo',
  })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/cover.jpg',
    description: 'Optional cover photo',
  })
  @IsOptional()
  @IsString()
  coverPhoto?: string;
}
