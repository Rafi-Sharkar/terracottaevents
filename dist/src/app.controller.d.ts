export declare class AppController {
    root(): {
        message: string;
        docs: string;
    };
    health(): {
        status: string;
        timestamp: string;
    };
    version(): {
        version: string;
    };
}
