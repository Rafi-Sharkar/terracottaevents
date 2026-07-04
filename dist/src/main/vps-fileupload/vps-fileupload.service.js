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
exports.VpsFileUploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
let VpsFileUploadService = class VpsFileUploadService {
    configService;
    uploadsPath;
    constructor(configService) {
        this.configService = configService;
        this.uploadsPath =
            this.configService.get('UPLOAD_PATH') ||
                path.join(process.cwd(), 'uploads');
        this.ensureUploadDirectory();
    }
    resolvePublicBaseUrl(req) {
        const configuredBaseUrl = this.configService
            .get('BASE_URL')
            ?.trim();
        const forwardedProto = req?.headers['x-forwarded-proto'];
        const forwardedHost = req?.headers['x-forwarded-host'];
        const host = forwardedHost || req?.get('host');
        const protocol = forwardedProto || req?.protocol || 'https';
        if (configuredBaseUrl) {
            try {
                const parsed = new URL(configuredBaseUrl);
                if (parsed.hostname !== '0.0.0.0') {
                    return configuredBaseUrl.replace(/\/+$/, '');
                }
            }
            catch {
                return configuredBaseUrl.replace(/\/+$/, '');
            }
        }
        if (host) {
            return `${protocol}://${host}`.replace(/\/+$/, '');
        }
        return 'https://childcareregister.com';
    }
    async ensureUploadDirectory() {
        try {
            await fs.access(this.uploadsPath);
        }
        catch {
            await fs.mkdir(this.uploadsPath, { recursive: true });
        }
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
        if (mimeType === 'application/pdf')
            return 'document';
        return 'any';
    }
    async uploadFile(file, req) {
        let ext = path.extname(file.originalname) || '';
        const folder = this.getFolderByMimeType(file.mimetype);
        if (folder === 'images' && /\.(jpg|jpeg|png|gif)$/i.test(ext)) {
            ext = '.webp';
        }
        const filename = `${(0, crypto_1.randomUUID)()}${ext.toLowerCase()}`;
        const storedPath = `${folder}/${filename}`;
        const filepath = path.join(this.uploadsPath, folder, filename);
        const baseUrl = this.resolvePublicBaseUrl(req);
        const now = new Date();
        let finalSize = file.size;
        let finalMimeType = file.mimetype;
        try {
            await fs.mkdir(path.dirname(filepath), { recursive: true });
            if (folder === 'images' && ext === '.webp') {
                const info = await (0, sharp_1.default)(file.buffer)
                    .webp({ quality: 80 })
                    .resize(1920, 1080, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                    .toFile(filepath);
                finalSize = info.size;
                finalMimeType = 'image/webp';
            }
            else {
                await fs.writeFile(filepath, file.buffer);
            }
            return {
                id: (0, crypto_1.randomUUID)(),
                filename,
                originalFilename: file.originalname,
                path: storedPath,
                url: `${baseUrl}/files/${storedPath}`,
                fileType: this.getFileType(finalMimeType),
                mimeType: finalMimeType,
                size: finalSize,
                createdAt: now,
                updatedAt: now,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to upload file: ${error.message}`);
        }
    }
    async uploadMultiple(files, req) {
        const results = [];
        const errors = [];
        await Promise.allSettled(files.map((file) => this.uploadFile(file, req))).then((outcomes) => {
            outcomes.forEach((outcome, index) => {
                if (outcome.status === 'fulfilled') {
                    results.push(outcome.value);
                }
                else {
                    errors.push({
                        filename: files[index].originalname,
                        error: outcome.reason?.message || 'Upload failed',
                    });
                }
            });
        });
        if (errors.length > 0 && results.length === 0) {
            throw new common_1.InternalServerErrorException(`Failed to upload files: ${errors[0]?.error || 'Upload failed'}`);
        }
        return results;
    }
    async deleteFile(filename) {
        const candidatePaths = [
            path.join(this.uploadsPath, filename),
            path.join(this.uploadsPath, 'images', filename),
            path.join(this.uploadsPath, 'audio', filename),
            path.join(this.uploadsPath, 'videos', filename),
            path.join(this.uploadsPath, 'documents', filename),
        ];
        try {
            let deleted = false;
            for (const filepath of candidatePaths) {
                try {
                    await fs.access(filepath);
                    await fs.unlink(filepath);
                    deleted = true;
                    break;
                }
                catch {
                    continue;
                }
            }
            if (!deleted) {
                throw Object.assign(new Error('File not found'), { code: 'ENOENT' });
            }
        }
        catch (error) {
            if (error.code !== 'ENOENT') {
                throw new common_1.InternalServerErrorException(`Failed to delete file: ${error.message}`);
            }
        }
    }
    async deleteMultiple(filenames) {
        const errors = [];
        let deleted = 0;
        await Promise.allSettled(filenames.map((filename) => this.deleteFile(filename))).then((outcomes) => {
            outcomes.forEach((outcome, index) => {
                if (outcome.status === 'fulfilled') {
                    deleted++;
                }
                else {
                    errors.push({
                        filename: filenames[index],
                        error: outcome.reason?.message || 'Deletion failed',
                    });
                }
            });
        });
        return {
            deleted,
            failed: errors.length,
            ...(errors.length > 0 && { errors }),
        };
    }
    extractFilename(url) {
        return url.split('/').pop() || '';
    }
};
exports.VpsFileUploadService = VpsFileUploadService;
exports.VpsFileUploadService = VpsFileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], VpsFileUploadService);
//# sourceMappingURL=vps-fileupload.service.js.map