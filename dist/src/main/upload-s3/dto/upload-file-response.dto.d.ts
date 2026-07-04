import { FileType } from "../../../../prisma/generated/client";
export declare class UploadedFileDto {
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: FileType;
    mimeType: string;
    size: number;
}
export declare class UploadFilesResponseDto {
    files: UploadedFileDto[];
    count: number;
}
