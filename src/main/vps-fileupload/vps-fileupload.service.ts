import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';

export interface FileUploadResult {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class VpsFileUploadService {
  private readonly uploadsPath: string;

  constructor(private configService: ConfigService) {
    this.uploadsPath =
      this.configService.get<string>('UPLOAD_PATH') ||
      path.join(process.cwd(), 'uploads');

    this.ensureUploadDirectory();
  }

  private resolvePublicBaseUrl(req?: Request): string {
    const configuredBaseUrl = this.configService
      .get<string>('BASE_URL')
      ?.trim();
    const forwardedProto = req?.headers['x-forwarded-proto'] as
      | string
      | undefined;
    const forwardedHost = req?.headers['x-forwarded-host'] as
      | string
      | undefined;
    const host = forwardedHost || req?.get('host');
    const protocol = forwardedProto || req?.protocol || 'https';

    if (configuredBaseUrl) {
      try {
        const parsed = new URL(configuredBaseUrl);
        if (parsed.hostname !== '0.0.0.0') {
          return configuredBaseUrl.replace(/\/+$/, '');
        }
      } catch {
        return configuredBaseUrl.replace(/\/+$/, '');
      }
    }

    if (host) {
      return `${protocol}://${host}`.replace(/\/+$/, '');
    }

    return 'https://childcareregister.com';
  }

  private async ensureUploadDirectory(): Promise<void> {
    try {
      await fs.access(this.uploadsPath);
    } catch {
      await fs.mkdir(this.uploadsPath, { recursive: true });
    }
  }

  private getFolderByMimeType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'images';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'videos';
    return 'documents';
  }

  private getFileType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'document';
    return 'any';
  }

  async uploadFile(
    file: Express.Multer.File,
    req?: Request,
  ): Promise<FileUploadResult> {
    let ext = path.extname(file.originalname) || '';
    const folder = this.getFolderByMimeType(file.mimetype);

    if (folder === 'images' && /\.(jpg|jpeg|png|gif)$/i.test(ext)) {
      ext = '.webp';
    }

    const filename = `${randomUUID()}${ext.toLowerCase()}`;
    const storedPath = `${folder}/${filename}`;
    const filepath = path.join(this.uploadsPath, folder, filename);
    const baseUrl = this.resolvePublicBaseUrl(req);
    const now = new Date();

    let finalSize = file.size;
    let finalMimeType = file.mimetype;

    try {
      await fs.mkdir(path.dirname(filepath), { recursive: true });

      if (folder === 'images' && ext === '.webp') {
        const info = await sharp(file.buffer)
          .webp({ quality: 80 })
          .resize(1920, 1080, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toFile(filepath);
        finalSize = info.size;
        finalMimeType = 'image/webp';
      } else {
        await fs.writeFile(filepath, file.buffer);
      }

      return {
        id: randomUUID(),
        filename,
        originalFilename: file.originalname,
        path: storedPath,
        url: `${baseUrl}/files/${storedPath}`,
        fileType: this.getFileType(finalMimeType),
        mimeType: finalMimeType,
        size: finalSize,
        createdAt: now,
        updatedAt: now,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Failed to upload file: ${error.message}`,
      );
    }
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    req?: Request,
  ): Promise<FileUploadResult[]> {
    const results: FileUploadResult[] = [];
    const errors: Array<{ filename: string; error: string }> = [];

    await Promise.allSettled(
      files.map((file) => this.uploadFile(file, req)),
    ).then((outcomes) => {
      outcomes.forEach((outcome, index) => {
        if (outcome.status === 'fulfilled') {
          results.push(outcome.value);
        } else {
          errors.push({
            filename: files[index].originalname,
            error: outcome.reason?.message || 'Upload failed',
          });
        }
      });
    });

    if (errors.length > 0 && results.length === 0) {
      throw new InternalServerErrorException(
        `Failed to upload files: ${errors[0]?.error || 'Upload failed'}`,
      );
    }

    return results;
  }

  async deleteFile(filename: string): Promise<void> {
    const candidatePaths = [
      path.join(this.uploadsPath, filename),
      path.join(this.uploadsPath, 'images', filename),
      path.join(this.uploadsPath, 'audio', filename),
      path.join(this.uploadsPath, 'videos', filename),
      path.join(this.uploadsPath, 'documents', filename),
    ];

    try {
      let deleted = false;

      for (const filepath of candidatePaths) {
        try {
          await fs.access(filepath);
          await fs.unlink(filepath);
          deleted = true;
          break;
        } catch {
          continue;
        }
      }

      if (!deleted) {
        throw Object.assign(new Error('File not found'), { code: 'ENOENT' });
      }
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw new InternalServerErrorException(
          `Failed to delete file: ${error.message}`,
        );
      }
    }
  }

  async deleteMultiple(filenames: string[]): Promise<{
    deleted: number;
    failed: number;
    errors?: Array<{ filename: string; error: string }>;
  }> {
    const errors: Array<{ filename: string; error: string }> = [];
    let deleted = 0;

    await Promise.allSettled(
      filenames.map((filename) => this.deleteFile(filename)),
    ).then((outcomes) => {
      outcomes.forEach((outcome, index) => {
        if (outcome.status === 'fulfilled') {
          deleted++;
        } else {
          errors.push({
            filename: filenames[index],
            error: outcome.reason?.message || 'Deletion failed',
          });
        }
      });
    });

    return {
      deleted,
      failed: errors.length,
      ...(errors.length > 0 && { errors }),
    };
  }

  extractFilename(url: string): string {
    return url.split('/').pop() || '';
  }
}
