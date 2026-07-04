"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_TYPE_CATEGORIES = exports.UPLOAD_CONFIG = void 0;
exports.getFileCategory = getFileCategory;
exports.isFileTypeAllowed = isFileTypeAllowed;
const path_1 = require("path");
exports.UPLOAD_CONFIG = {
    uploadDir: process.env.NODE_ENV === 'production'
        ? '/tmp/uploads'
        : process.env.UPLOAD_DIR || (0, path_1.join)(process.cwd(), 'uploads'),
    maxFileSize: 1000 * 1024 * 1024,
    maxFiles: 5,
    allowedMimeTypes: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv',
        'application/zip',
        'application/x-rar-compressed',
    ],
};
exports.FILE_TYPE_CATEGORIES = {
    images: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
    ],
    documents: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    spreadsheets: [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
    ],
    presentations: [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    text: ['text/plain'],
    archives: ['application/zip', 'application/x-rar-compressed'],
};
function getFileCategory(mimetype) {
    for (const [category, mimetypes] of Object.entries(exports.FILE_TYPE_CATEGORIES)) {
        if (mimetypes.includes(mimetype)) {
            return category;
        }
    }
    return 'other';
}
function isFileTypeAllowed(mimetype) {
    return exports.UPLOAD_CONFIG.allowedMimeTypes.includes(mimetype);
}
//# sourceMappingURL=vps-upload.config.js.map