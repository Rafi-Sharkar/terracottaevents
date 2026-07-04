import { PaginationDto } from "../../common/dto/pagination.dto";
import { DeleteFilesRequestDto } from './dto/delete-file.dto';
import { UploadService } from './service/upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    upload(files: Express.Multer.File[]): Promise<import("../../common/utils/response.util").TResponse<any>>;
    deleteFiles(body: DeleteFilesRequestDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    getFiles(pg: PaginationDto): Promise<import("../../common/utils/response.util").TPaginatedResponse<any>>;
    getFileById(id: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
}
