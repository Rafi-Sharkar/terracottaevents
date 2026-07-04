export type TResponse<T = unknown> = {
    success: boolean;
    message: string | string[];
    data: T;
};
export type TPaginatedResponse<T = unknown> = {
    success: boolean;
    message: string | string[];
    data: T[];
    metadata: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
};
export declare const successResponse: <T>(data: T, message?: string) => TResponse<T>;
export declare const successPaginatedResponse: <T>(data: T[], metaData: {
    page: number;
    limit: number;
    total: number;
}, message?: string) => TPaginatedResponse<T>;
export declare const errorResponse: <T>(data: T, message?: string) => TResponse<T>;
