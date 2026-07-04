"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const response_util_1 = require("../../../common/utils/response.util");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const handle_error_decorator_1 = require("../../../core/error/handle-error.decorator");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3.service");
let UploadService = class UploadService {
    prisma;
    s3;
    constructor(prisma, s3) {
        this.prisma = prisma;
        this.s3 = s3;
    }
    async uploadFiles(files) {
        if (!files || files.length === 0) {
            throw new handle_error_app_1.AppError(404, 'No file(s) uploaded');
        }
        if (files.length > 5) {
            throw new handle_error_app_1.AppError(400, 'You can upload a maximum of 5 files');
        }
        const results = await Promise.all(files.map((file) => this.s3.uploadFile(file)));
        return (0, response_util_1.successResponse)({
            files: results,
            count: results.length,
        }, 'Files uploaded successfully');
    }
    async deleteFiles(fileIds) {
        if (!fileIds?.length)
            throw new handle_error_app_1.AppError(400, 'No file IDs provided');
        const files = await this.prisma.client.fileInstance.findMany({
            where: { id: { in: fileIds } },
        });
        if (!files.length)
            throw new handle_error_app_1.AppError(404, 'Files not found');
        await Promise.all(files.map((f) => this.s3.deleteFile(f.id)));
        return (0, response_util_1.successResponse)({ files, count: files.length }, 'Files deleted successfully');
    }
    async getFiles(pg) {
        const page = pg.page && +pg.page > 0 ? +pg.page : 1;
        const limit = pg.limit && +pg.limit > 0 ? +pg.limit : 10;
        const skip = (page - 1) * limit;
        const [files, total] = await this.prisma.client.$transaction([
            this.prisma.client.fileInstance.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.client.fileInstance.count(),
        ]);
        return (0, response_util_1.successPaginatedResponse)(files, { page, limit, total }, 'Files found');
    }
    async getFileById(id) {
        const file = await this.prisma.client.fileInstance.findUnique({
            where: { id },
        });
        if (!file)
            throw new handle_error_app_1.AppError(404, 'File not found');
        return (0, response_util_1.successResponse)(file, 'File found');
    }
};
exports.UploadService = UploadService;
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to upload file(s)', 'File'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadService.prototype, "uploadFiles", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to delete files', 'File'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadService.prototype, "deleteFiles", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to get files', 'File'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UploadService.prototype, "getFiles", null);
__decorate([
    (0, handle_error_decorator_1.HandleError)('Failed to get file', 'File'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadService.prototype, "getFileById", null);
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        s3_service_1.S3Service])
], UploadService);
//# sourceMappingURL=upload.service.js.map