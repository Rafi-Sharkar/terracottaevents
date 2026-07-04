"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMulterOptions = createMulterOptions;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const vps_upload_config_1 = require("./vps-upload.config");
function createMulterOptions() {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                try {
                    if (!(0, fs_1.existsSync)(vps_upload_config_1.UPLOAD_CONFIG.uploadDir)) {
                        (0, fs_1.mkdirSync)(vps_upload_config_1.UPLOAD_CONFIG.uploadDir, {
                            recursive: true,
                            mode: 0o755,
                        });
                    }
                    callback(null, vps_upload_config_1.UPLOAD_CONFIG.uploadDir);
                }
                catch {
                    callback(new common_1.BadRequestException('Failed to create upload directory'), '');
                }
            },
            filename: (req, file, callback) => {
                try {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const fileExt = (0, path_1.extname)(file.originalname);
                    callback(null, `${uniqueSuffix}${fileExt}`);
                }
                catch {
                    callback(new common_1.BadRequestException('Failed to generate filename'), '');
                }
            },
        }),
        limits: {
            files: vps_upload_config_1.UPLOAD_CONFIG.maxFiles,
            fileSize: vps_upload_config_1.UPLOAD_CONFIG.maxFileSize,
        },
        fileFilter: (req, file, callback) => {
            if (vps_upload_config_1.UPLOAD_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            }
            else {
                callback(new common_1.BadRequestException(`File type "${file.mimetype}" is not allowed. Allowed types: images, documents, spreadsheets, presentations`), false);
            }
        },
    };
}
//# sourceMappingURL=vps-upload.multer.config.js.map