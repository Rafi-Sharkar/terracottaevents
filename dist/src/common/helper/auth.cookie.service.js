"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = void 0;
const setAuthCookies = (res, accessToken, refreshToken, refreshExpiresAt) => {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: refreshExpiresAt,
    });
};
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
};
exports.clearAuthCookies = clearAuthCookies;
//# sourceMappingURL=auth.cookie.service.js.map