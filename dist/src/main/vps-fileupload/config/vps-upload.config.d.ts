export interface UploadConfig {
    uploadDir: string;
    maxFileSize: number;
    maxFiles: number;
    allowedMimeTypes: string[];
}
export declare const UPLOAD_CONFIG: UploadConfig;
export declare const FILE_TYPE_CATEGORIES: {
    images: string[];
    documents: string[];
    spreadsheets: string[];
    presentations: string[];
    text: string[];
    archives: string[];
};
export declare function getFileCategory(mimetype: string): string;
export declare function isFileTypeAllowed(mimetype: string): boolean;
