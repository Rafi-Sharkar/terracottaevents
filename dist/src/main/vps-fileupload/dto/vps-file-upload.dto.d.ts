export declare class DeleteFileDto {
    filename: string;
}
export declare class DeleteMultipleFilesDto {
    filenames: string[];
}
export declare class FileUploadResponseDto {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: string;
    mimeType: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class MultipleFileUploadResponseDto {
    files: FileUploadResponseDto[];
    count: number;
}
export declare class UploadEnvelopeResponseDto {
    success: boolean;
    message: string;
    data: MultipleFileUploadResponseDto;
}
