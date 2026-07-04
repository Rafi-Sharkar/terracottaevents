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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpsFileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const ALLOWED_MIME_TYPES = /^(image\/(jpg|jpeg|png|gif|webp|avif|svg\+xml)|video\/(mp4|x-msvideo|quicktime|webm|ogg)|audio\/(mpeg|wav|aac|ogg)|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation|zip|x-rar-compressed)|text\/(plain|csv))$/i;
const response_util_1 = require("../../common/utils/response.util");
const vps_file_upload_dto_1 = require("./dto/vps-file-upload.dto");
const vps_fileupload_service_1 = require("./vps-fileupload.service");
let VpsFileUploadController = class VpsFileUploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadSingle(file, req) {
        const uploadedFile = await this.uploadService.uploadFile(file, req);
        return (0, response_util_1.successResponse)({
            files: [uploadedFile],
            count: 1,
        }, 'Files uploaded successfully');
    }
    async uploadMultiple(files, req) {
        if (!files?.length) {
            throw new common_1.BadRequestException('No files provided');
        }
        const uploadedFiles = await this.uploadService.uploadMultiple(files, req);
        return (0, response_util_1.successResponse)({
            files: uploadedFiles,
            count: uploadedFiles.length,
        }, 'Files uploaded successfully');
    }
    async deleteSingle(dto) {
        await this.uploadService.deleteFile(dto.filename);
        return {
            message: 'File deleted successfully',
            filename: dto.filename,
        };
    }
    async deleteMultiple(dto) {
        const result = await this.uploadService.deleteMultiple(dto.filenames);
        return {
            message: 'Deletion completed',
            ...result,
        };
    }
};
exports.VpsFileUploadController = VpsFileUploadController;
__decorate([
    (0, common_1.Post)('single'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a single file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: ALLOWED_MIME_TYPES,
            }),
        ],
        fileIsRequired: true,
    }))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VpsFileUploadController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload multiple files (max 10)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: ALLOWED_MIME_TYPES,
            }),
        ],
        fileIsRequired: true,
    }))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], VpsFileUploadController.prototype, "uploadMultiple", null);
__decorate([
    (0, common_1.Delete)('single'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a single file' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vps_file_upload_dto_1.DeleteFileDto]),
    __metadata("design:returntype", Promise)
], VpsFileUploadController.prototype, "deleteSingle", null);
__decorate([
    (0, common_1.Delete)('multiple'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple files' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vps_file_upload_dto_1.DeleteMultipleFilesDto]),
    __metadata("design:returntype", Promise)
], VpsFileUploadController.prototype, "deleteMultiple", null);
exports.VpsFileUploadController = VpsFileUploadController = __decorate([
    (0, swagger_1.ApiTags)('Upload File -------------------- File Upload into VPS'),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [vps_fileupload_service_1.VpsFileUploadService])
], VpsFileUploadController);
//# sourceMappingURL=vps-fileupload.controller.js.map