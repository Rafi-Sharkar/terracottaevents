import { Request } from 'express';
import { TResponse } from "../../common/utils/response.util";
import { DeleteFileDto, DeleteMultipleFilesDto, MultipleFileUploadResponseDto } from './dto/vps-file-upload.dto';
import { VpsFileUploadService } from './vps-fileupload.service';
export declare class VpsFileUploadController {
    private readonly uploadService;
    constructor(uploadService: VpsFileUploadService);
    uploadSingle(file: Express.Multer.File, req: Request): Promise<TResponse<MultipleFileUploadResponseDto>>;
    uploadMultiple(files: Express.Multer.File[], req: Request): Promise<TResponse<MultipleFileUploadResponseDto>>;
    deleteSingle(dto: DeleteFileDto): Promise<{
        message: string;
        filename: string;
    }>;
    deleteMultiple(dto: DeleteMultipleFilesDto): Promise<{
        deleted: number;
        failed: number;
        errors?: Array<{
            filename: string;
            error: string;
        }>;
        message: string;
    }>;
}
