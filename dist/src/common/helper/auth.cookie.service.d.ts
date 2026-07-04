import { Response } from 'express';
export declare const setAuthCookies: (res: Response, accessToken: string, refreshToken: string, refreshExpiresAt: Date) => void;
export declare const clearAuthCookies: (res: Response) => void;
