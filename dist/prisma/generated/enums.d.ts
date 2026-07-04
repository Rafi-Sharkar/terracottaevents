export declare const OtpType: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PHONE_VERIFICATION: "PHONE_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type OtpType = (typeof OtpType)[keyof typeof OtpType];
export declare const FileType: {
    readonly file: "file";
    readonly image: "image";
    readonly docs: "docs";
    readonly link: "link";
    readonly video: "video";
    readonly audio: "audio";
    readonly any: "any";
};
export type FileType = (typeof FileType)[keyof typeof FileType];
export declare const BillingCycle: {
    readonly ONE_TIME: "ONE_TIME";
    readonly MONTHLY: "MONTHLY";
    readonly YEARLY: "YEARLY";
};
export type BillingCycle = (typeof BillingCycle)[keyof typeof BillingCycle];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly NOT_PAID: "NOT_PAID";
    readonly PAYMENT_CONFIRM: "PAYMENT_CONFIRM";
    readonly PAYMENT_FAILED: "PAYMENT_FAILED";
    readonly CHECK_IN_COMPLETED: "CHECK_IN_COMPLETED";
    readonly CHECK_OUT_COMPLETED: "CHECK_OUT_COMPLETED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const PaymentMethod: {
    readonly PHYSICAL: "PHYSICAL";
    readonly BKASH: "BKASH";
    readonly NAGAD: "NAGAD";
    readonly BANK_TRANSACTION: "BANK_TRANSACTION";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const UserRole: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly DELETED: "DELETED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const AuthProvider: {
    readonly EMAIL: "EMAIL";
    readonly GOOGLE: "GOOGLE";
    readonly APPLE: "APPLE";
};
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
