import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
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
export declare class VpsFileUploadService {
    private configService;
    private readonly uploadsPath;
    constructor(configService: ConfigService);
    private resolvePublicBaseUrl;
    private ensureUploadDirectory;
    private getFolderByMimeType;
    private getFileType;
    uploadFile(file: Express.Multer.File, req?: Request): Promise<FileUploadResult>;
    uploadMultiple(files: Express.Multer.File[], req?: Request): Promise<FileUploadResult[]>;
    deleteFile(filename: string): Promise<void>;
    deleteMultiple(filenames: string[]): Promise<{
        deleted: number;
        failed: number;
        errors?: Array<{
            filename: string;
            error: string;
        }>;
    }>;
    extractFilename(url: string): string;
}
