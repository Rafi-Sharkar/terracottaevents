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
exports.UploadEnvelopeResponseDto = exports.MultipleFileUploadResponseDto = exports.FileUploadResponseDto = exports.DeleteMultipleFilesDto = exports.DeleteFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeleteFileDto {
    filename;
}
exports.DeleteFileDto = DeleteFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filename to delete',
        example: '1234567890_image.jpg',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteFileDto.prototype, "filename", void 0);
class DeleteMultipleFilesDto {
    filenames;
}
exports.DeleteMultipleFilesDto = DeleteMultipleFilesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of filenames to delete',
        type: [String],
        example: ['1234567890_file1.jpg', '1234567891_file2.png'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DeleteMultipleFilesDto.prototype, "filenames", void 0);
class FileUploadResponseDto {
    id;
    filename;
    originalFilename;
    path;
    url;
    fileType;
    mimeType;
    size;
    createdAt;
    updatedAt;
}
exports.FileUploadResponseDto = FileUploadResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5dc735ac-84b9-4d5a-8211-f9a63cc446a1' }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '72fc6b61-a450-47bd-a41d-39c15164d676.jpg' }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'download.jpg' }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "originalFilename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'images/72fc6b61-a450-47bd-a41d-39c15164d676.jpg' }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://api.childcareregister.com/files/images/72fc6b61-a450-47bd-a41d-39c15164d676.jpg',
    }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image' }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image/jpeg' }),
    __metadata("design:type", String)
], FileUploadResponseDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 102400 }),
    __metadata("design:type", Number)
], FileUploadResponseDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-04-21T17:02:09.706Z' }),
    __metadata("design:type", Date)
], FileUploadResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-04-21T17:02:09.706Z' }),
    __metadata("design:type", Date)
], FileUploadResponseDto.prototype, "updatedAt", void 0);
class MultipleFileUploadResponseDto {
    files;
    count;
}
exports.MultipleFileUploadResponseDto = MultipleFileUploadResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [FileUploadResponseDto],
    }),
    __metadata("design:type", Array)
], MultipleFileUploadResponseDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], MultipleFileUploadResponseDto.prototype, "count", void 0);
class UploadEnvelopeResponseDto {
    success;
    message;
    data;
}
exports.UploadEnvelopeResponseDto = UploadEnvelopeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UploadEnvelopeResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Files uploaded successfully' }),
    __metadata("design:type", String)
], UploadEnvelopeResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MultipleFileUploadResponseDto }),
    __metadata("design:type", MultipleFileUploadResponseDto)
], UploadEnvelopeResponseDto.prototype, "data", void 0);
//# sourceMappingURL=vps-file-upload.dto.js.map