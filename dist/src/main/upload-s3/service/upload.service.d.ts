import { PaginationDto } from "../../../common/dto/pagination.dto";
import { TPaginatedResponse, TResponse } from "../../../common/utils/response.util";
import { PrismaService } from "../../../lib/prisma/prisma.service";
import { S3Service } from './s3.service';
export declare class UploadService {
    private readonly prisma;
    private readonly s3;
    constructor(prisma: PrismaService, s3: S3Service);
    uploadFiles(files: Express.Multer.File[]): Promise<TResponse<any>>;
    deleteFiles(fileIds: string[]): Promise<TResponse<any>>;
    getFiles(pg: PaginationDto): Promise<TPaginatedResponse<any>>;
    getFileById(id: string): Promise<TResponse<any>>;
}
