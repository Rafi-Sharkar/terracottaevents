"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.JsonNullValueFilter = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.UserScalarFieldEnum = exports.BookingScalarFieldEnum = exports.PlanBenefitsScalarFieldEnum = exports.BenefitsScalarFieldEnum = exports.PlanScalarFieldEnum = exports.FileInstanceScalarFieldEnum = exports.RateLimitAttemptScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.UserOtpScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    UserOtp: 'UserOtp',
    RefreshToken: 'RefreshToken',
    RateLimitAttempt: 'RateLimitAttempt',
    FileInstance: 'FileInstance',
    Plan: 'Plan',
    Benefits: 'Benefits',
    PlanBenefits: 'PlanBenefits',
    Booking: 'Booking',
    User: 'User'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserOtpScalarFieldEnum = {
    id: 'id',
    code: 'code',
    type: 'type',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RateLimitAttemptScalarFieldEnum = {
    id: 'id',
    identifier: 'identifier',
    action: 'action',
    success: 'success',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.FileInstanceScalarFieldEnum = {
    id: 'id',
    filename: 'filename',
    originalFilename: 'originalFilename',
    path: 'path',
    url: 'url',
    fileType: 'fileType',
    mimeType: 'mimeType',
    size: 'size',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    price: 'price',
    isMostPopular: 'isMostPopular',
    BillingCycle: 'BillingCycle',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BenefitsScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
};
exports.PlanBenefitsScalarFieldEnum = {
    id: 'id',
    planId: 'planId',
    BenefitsId: 'BenefitsId'
};
exports.BookingScalarFieldEnum = {
    id: 'id',
    status: 'status',
    discount: 'discount',
    bookingDate: 'bookingDate',
    paymentDate: 'paymentDate',
    checkInDate: 'checkInDate',
    checkOutDate: 'checkOutDate',
    paymentMethod: 'paymentMethod',
    bkashTransactionId: 'bkashTransactionId',
    nagadTransactionId: 'nagadTransactionId',
    bankTransactionId: 'bankTransactionId',
    userId: 'userId',
    planId: 'planId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    username: 'username',
    email: 'email',
    password: 'password',
    profilePicture: 'profilePicture',
    coverPhoto: 'coverPhoto',
    role: 'role',
    status: 'status',
    isVerified: 'isVerified',
    isOnline: 'isOnline',
    tokens: 'tokens',
    stripeCustomerId: 'stripeCustomerId',
    lastLoginAt: 'lastLoginAt',
    lastActiveAt: 'lastActiveAt',
    authProvider: 'authProvider',
    googleId: 'googleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map