"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successPaginatedResponse = exports.successResponse = void 0;
const successResponse = (data, message = 'Request Success') => ({
    success: true,
    message,
    data,
});
exports.successResponse = successResponse;
const successPaginatedResponse = (data, metaData, message = 'Request Success') => ({
    success: true,
    message,
    data,
    metadata: {
        page: metaData.page,
        limit: metaData.limit,
        total: metaData.total,
        totalPage: Math.ceil(metaData.total / metaData.limit),
    },
});
exports.successPaginatedResponse = successPaginatedResponse;
const errorResponse = (data, message = 'Request Failed') => ({
    success: false,
    message,
    data,
});
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.util.js.map