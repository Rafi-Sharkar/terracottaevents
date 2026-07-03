import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2...',
    description: 'Google ID token obtained from Google Sign-In',
    name: 'idToken',
  })
  @IsString()
  @IsNotEmpty()
  googleId: string;
}
