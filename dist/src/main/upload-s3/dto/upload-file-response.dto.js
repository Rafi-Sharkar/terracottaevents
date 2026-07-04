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
exports.UploadFilesResponseDto = exports.UploadedFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const _prisma_1 = require("../../../../prisma/generated/client");
class UploadedFileDto {
    filename;
    originalFilename;
    path;
    url;
    fileType;
    mimeType;
    size;
}
exports.UploadedFileDto = UploadedFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000.mp4' }),
    __metadata("design:type", String)
], UploadedFileDto.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'my-video.mp4' }),
    __metadata("design:type", String)
], UploadedFileDto.prototype, "originalFilename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'videos/123e4567-e89b-12d3-a456-426614174000.mp4' }),
    __metadata("design:type", String)
], UploadedFileDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://bucket-name.s3.region.amazonaws.com/videos/123e4567-e89b-12d3-a456-426614174000.mp4',
    }),
    __metadata("design:type", String)
], UploadedFileDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: _prisma_1.FileType, example: _prisma_1.FileType.video }),
    __metadata("design:type", String)
], UploadedFileDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'video/mp4' }),
    __metadata("design:type", String)
], UploadedFileDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1048576 }),
    __metadata("design:type", Number)
], UploadedFileDto.prototype, "size", void 0);
class UploadFilesResponseDto {
    files;
    count;
}
exports.UploadFilesResponseDto = UploadFilesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UploadedFileDto] }),
    __metadata("design:type", Array)
], UploadFilesResponseDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UploadFilesResponseDto.prototype, "count", void 0);
//# sourceMappingURL=upload-file-response.dto.js.map