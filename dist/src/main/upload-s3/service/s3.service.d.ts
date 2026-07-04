import { PrismaService } from "../../../lib/prisma/prisma.service";
import { ConfigService } from '@nestjs/config';
import { FileType } from "../../../../prisma/generated/client";
export declare class S3Service {
    private readonly configService;
    private readonly prisma;
    private s3;
    private S3_BUCKET_NAME;
    private S3_REGION;
    private S3_ENDPOINT;
    private S3_FORCE_PATH_STYLE;
    constructor(configService: ConfigService, prisma: PrismaService);
    private getFileUrl;
    private uploadBuffer;
    private deleteObject;
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        originalFilename: string;
        path: string;
        url: string;
        fileType: FileType;
        mimeType: string;
        size: number;
    }>;
    deleteFile(id: string): Promise<void>;
    uploadFileByPath(filePath: string, originalName?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        originalFilename: string;
        path: string;
        url: string;
        fileType: FileType;
        mimeType: string;
        size: number;
    }>;
    getFolderByMimeType(mimeType: string): string;
    getFileType(mimeType: string): FileType;
    getMimeTypeFromExtension(ext: string): string;
}
