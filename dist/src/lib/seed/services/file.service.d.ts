import { OnModuleInit } from '@nestjs/common';
export declare class FileService implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
    private ensureDirectoriesExist;
}
