import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

const ALLOWED_MIME_TYPES =
  /^(image\/(jpg|jpeg|png|gif|webp|avif|svg\+xml)|video\/(mp4|x-msvideo|quicktime|webm|ogg)|audio\/(mpeg|wav|aac|ogg)|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation|zip|x-rar-compressed)|text\/(plain|csv))$/i;

import { successResponse, TResponse } from '@/common/utils/response.util';
import {
  DeleteFileDto,
  DeleteMultipleFilesDto,
  MultipleFileUploadResponseDto,
} from './dto/vps-file-upload.dto';
import { VpsFileUploadService } from './vps-fileupload.service';

@ApiTags('Upload File -------------------- File Upload into VPS')
@Controller('upload')
export class VpsFileUploadController {
  constructor(private readonly uploadService: VpsFileUploadService) {}

  @Post('single')
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: ALLOWED_MIME_TYPES,
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<TResponse<MultipleFileUploadResponseDto>> {
    const uploadedFile = await this.uploadService.uploadFile(file, req);

    return successResponse(
      {
        files: [uploadedFile],
        count: 1,
      },
      'Files uploaded successfully',
    );
  }

  // ------------------------ Upload Multiple Files ----------------------- //
  @Post('multiple')
  @ApiOperation({ summary: 'Upload multiple files (max 10)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadMultiple(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: ALLOWED_MIME_TYPES,
          }),
        ],
        fileIsRequired: true,
      }),
    )
    files: Express.Multer.File[],
    @Req() req: Request,
  ): Promise<TResponse<MultipleFileUploadResponseDto>> {
    if (!files?.length) {
      throw new BadRequestException('No files provided');
    }

    const uploadedFiles = await this.uploadService.uploadMultiple(files, req);

    return successResponse(
      {
        files: uploadedFiles,
        count: uploadedFiles.length,
      },
      'Files uploaded successfully',
    );
  }

  @Delete('single')
  @ApiOperation({ summary: 'Delete a single file' })
  async deleteSingle(@Body() dto: DeleteFileDto) {
    await this.uploadService.deleteFile(dto.filename);
    return {
      message: 'File deleted successfully',
      filename: dto.filename,
    };
  }

  @Delete('multiple')
  @ApiOperation({ summary: 'Delete multiple files' })
  async deleteMultiple(@Body() dto: DeleteMultipleFilesDto) {
    const result = await this.uploadService.deleteMultiple(dto.filenames);
    return {
      message: 'Deletion completed',
      ...result,
    };
  }
}
