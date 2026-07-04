"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const env_enum_1 = require("../../../common/enum/env.enum");
const handle_error_app_1 = require("../../../core/error/handle-error.app");
const prisma_service_1 = require("../../../lib/prisma/prisma.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs"));
const node_path_1 = __importDefault(require("node:path"));
const uuid_1 = require("uuid");
let S3Service = class S3Service {
    configService;
    prisma;
    s3;
    S3_BUCKET_NAME;
    S3_REGION;
    S3_ENDPOINT;
    S3_FORCE_PATH_STYLE;
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.S3_REGION = this.configService.getOrThrow(env_enum_1.ENVEnum.S3_REGION);
        this.S3_BUCKET_NAME = this.configService.getOrThrow(env_enum_1.ENVEnum.S3_BUCKET);
        this.S3_ENDPOINT = this.configService.getOrThrow(env_enum_1.ENVEnum.S3_ENDPOINT);
        this.S3_FORCE_PATH_STYLE =
            this.configService.get(env_enum_1.ENVEnum.S3_FORCE_PATH_STYLE) === 'true';
        this.s3 = new client_s3_1.S3Client({
            region: this.S3_REGION,
            endpoint: this.S3_ENDPOINT,
            forcePathStyle: this.S3_FORCE_PATH_STYLE,
            credentials: {
                accessKeyId: this.configService.getOrThrow(env_enum_1.ENVEnum.S3_ACCESS_KEY),
                secretAccessKey: this.configService.getOrThrow(env_enum_1.ENVEnum.S3_SECRET_KEY),
            },
        });
    }
    getFileUrl(key) {
        if (this.S3_FORCE_PATH_STYLE) {
            return `${this.S3_ENDPOINT}/${this.S3_BUCKET_NAME}/${key}`;
        }
        const endpointHost = this.S3_ENDPOINT
            ? this.S3_ENDPOINT.replace(/^https?:\/\//, '')
            : `s3.${this.S3_REGION}.amazonaws.com`;
        const protocol = this.S3_ENDPOINT?.startsWith('http://')
            ? 'http://'
            : 'https://';
        return `${protocol}${this.S3_BUCKET_NAME}.${endpointHost}/${key}`;
    }
    async uploadBuffer(key, buffer, mimeType) {
        await this.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: this.S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: mimeType,
        }));
        return this.getFileUrl(key);
    }
    async deleteObject(key) {
        await this.s3.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.S3_BUCKET_NAME,
            Key: key,
        }));
    }
    async uploadFile(file) {
        const fileExt = file.originalname.split('.').pop();
        const folder = this.getFolderByMimeType(file.mimetype);
        const uniqueFileName = `${(0, uuid_1.v4)()}.${fileExt}`;
        const s3Key = `${folder}/${uniqueFileName}`;
        const fileUrl = await this.uploadBuffer(s3Key, file.buffer, file.mimetype);
        const fileRecord = await this.prisma.client.fileInstance.create({
            data: {
                filename: uniqueFileName,
                originalFilename: file.originalname,
                path: s3Key,
                url: fileUrl,
                fileType: this.getFileType(file.mimetype),
                mimeType: file.mimetype,
                size: file.size,
            },
        });
        return fileRecord;
    }
    async deleteFile(id) {
        const file = await this.prisma.client.fileInstance.findUnique({
            where: { id },
        });
        if (!file) {
            throw new handle_error_app_1.AppError(404, 'File not found');
        }
        await this.deleteObject(file.path);
        await this.prisma.client.fileInstance.delete({
            where: { id },
        });
    }
    async uploadFileByPath(filePath, originalName) {
        if (!fs.existsSync(filePath)) {
            throw new handle_error_app_1.AppError(404, `File not found at path: ${filePath}`);
        }
        const fileBuffer = fs.readFileSync(filePath);
        const fileExt = node_path_1.default.extname(originalName || filePath).slice(1);
        const mimeType = this.getMimeTypeFromExtension(fileExt);
        const folder = this.getFolderByMimeType(mimeType);
        const uniqueFileName = `${(0, uuid_1.v4)()}.${fileExt}`;
        const s3Key = `${folder}/${uniqueFileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.S3_BUCKET_NAME,
            Key: s3Key,
            Body: fileBuffer,
            ContentType: mimeType,
        });
        await this.s3.send(command);
        const fileUrl = this.getFileUrl(s3Key);
        const fileRecord = await this.prisma.client.fileInstance.create({
            data: {
                filename: uniqueFileName,
                originalFilename: originalName || node_path_1.default.basename(filePath),
                path: s3Key,
                url: fileUrl,
                fileType: this.getFileType(mimeType),
                mimeType,
                size: fileBuffer.length,
            },
        });
        fs.unlinkSync(filePath);
        return fileRecord;
    }
    getFolderByMimeType(mimeType) {
        if (mimeType.startsWith('image/'))
            return 'images';
        if (mimeType.startsWith('audio/'))
            return 'audio';
        if (mimeType.startsWith('video/'))
            return 'videos';
        return 'documents';
    }
    getFileType(mimeType) {
        if (mimeType.startsWith('image/'))
            return 'image';
        if (mimeType.startsWith('audio/'))
            return 'audio';
        if (mimeType.startsWith('video/'))
            return 'video';
        return 'any';
    }
    getMimeTypeFromExtension(ext) {
        ext = ext.toLowerCase();
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'webp':
                return 'image/webp';
            case 'gif':
                return 'image/gif';
            case 'svg':
                return 'image/svg+xml';
            case 'mp4':
                return 'video/mp4';
            case 'webm':
                return 'video/webm';
            case 'ogg':
                return 'video/ogg';
            case 'mp3':
                return 'audio/mpeg';
            case 'wav':
                return 'audio/wav';
            case 'aac':
                return 'audio/aac';
            case 'pdf':
                return 'application/pdf';
            default:
                return 'application/octet-stream';
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], S3Service);
//# sourceMappingURL=s3.service.js.map