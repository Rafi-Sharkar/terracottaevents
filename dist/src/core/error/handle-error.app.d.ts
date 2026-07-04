export declare class AppError extends Error {
    code: number;
    message: string;
    constructor(code: number | undefined, message: string);
}
