"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.UserStatus = exports.UserRole = exports.PaymentMethod = exports.BookingStatus = exports.BillingCycle = exports.FileType = exports.OtpType = void 0;
exports.OtpType = {
    EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
    PHONE_VERIFICATION: 'PHONE_VERIFICATION',
    PASSWORD_RESET: 'PASSWORD_RESET'
};
exports.FileType = {
    file: 'file',
    image: 'image',
    docs: 'docs',
    link: 'link',
    video: 'video',
    audio: 'audio',
    any: 'any'
};
exports.BillingCycle = {
    ONE_TIME: 'ONE_TIME',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY'
};
exports.BookingStatus = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    NOT_PAID: 'NOT_PAID',
    PAYMENT_CONFIRM: 'PAYMENT_CONFIRM',
    PAYMENT_FAILED: 'PAYMENT_FAILED',
    CHECK_IN_COMPLETED: 'CHECK_IN_COMPLETED',
    CHECK_OUT_COMPLETED: 'CHECK_OUT_COMPLETED'
};
exports.PaymentMethod = {
    PHYSICAL: 'PHYSICAL',
    BKASH: 'BKASH',
    NAGAD: 'NAGAD',
    BANK_TRANSACTION: 'BANK_TRANSACTION'
};
exports.UserRole = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    USER: 'USER'
};
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DELETED: 'DELETED'
};
exports.AuthProvider = {
    EMAIL: 'EMAIL',
    GOOGLE: 'GOOGLE',
    APPLE: 'APPLE'
};
//# sourceMappingURL=enums.js.map