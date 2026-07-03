import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeleteFileDto {
  @ApiProperty({
    description: 'Filename to delete',
    example: '1234567890_image.jpg',
  })
  @IsNotEmpty()
  @IsString()
  filename: string;
}

export class DeleteMultipleFilesDto {
  @ApiProperty({
    description: 'Array of filenames to delete',
    type: [String],
    example: ['1234567890_file1.jpg', '1234567891_file2.png'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  filenames: string[];
}

export class FileUploadResponseDto {
  @ApiProperty({ example: '5dc735ac-84b9-4d5a-8211-f9a63cc446a1' })
  id: string;

  @ApiProperty({ example: '72fc6b61-a450-47bd-a41d-39c15164d676.jpg' })
  filename: string;

  @ApiProperty({ example: 'download.jpg' })
  originalFilename: string;

  @ApiProperty({ example: 'images/72fc6b61-a450-47bd-a41d-39c15164d676.jpg' })
  path: string;

  @ApiProperty({
    example:
      'https://api.childcareregister.com/files/images/72fc6b61-a450-47bd-a41d-39c15164d676.jpg',
  })
  url: string;

  @ApiProperty({ example: 'image' })
  fileType: string;

  @ApiProperty({ example: 'image/jpeg' })
  mimeType: string;

  @ApiProperty({ example: 102400 })
  size: number;

  @ApiProperty({ example: '2026-04-21T17:02:09.706Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-04-21T17:02:09.706Z' })
  updatedAt: Date;
}

export class MultipleFileUploadResponseDto {
  @ApiProperty({
    type: [FileUploadResponseDto],
  })
  files: FileUploadResponseDto[];

  @ApiProperty({ example: 1 })
  count: number;
}

export class UploadEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Files uploaded successfully' })
  message: string;

  @ApiProperty({ type: MultipleFileUploadResponseDto })
  data: MultipleFileUploadResponseDto;
}
