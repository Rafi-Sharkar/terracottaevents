"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyError = simplifyError;
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../../prisma/generated/client");
const axios_1 = require("axios");
const handle_error_app_1 = require("./handle-error.app");
function simplifyError(error, customMessage = 'Operation Failed', record = 'Record') {
    if (error instanceof _prisma_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2000':
                throw new common_1.BadRequestException(`${record} field value too long`);
            case 'P2001':
                throw new common_1.NotFoundException(`${record} does not exist`);
            case 'P2002':
                throw new common_1.ConflictException(`${record} already exists`);
            case 'P2003':
                throw new common_1.ConflictException(`Foreign key constraint failed on ${record}`);
            case 'P2004':
                throw new common_1.BadRequestException(`Constraint failed on ${record}`);
            case 'P2005':
                throw new common_1.BadRequestException(`Invalid value provided for ${record} field`);
            case 'P2006':
                throw new common_1.BadRequestException(`Invalid data provided for ${record} field`);
            case 'P2007':
                throw new common_1.BadRequestException(`Data validation error on ${record}`);
            case 'P2008':
                throw new common_1.InternalServerErrorException(`Failed query parsing`);
            case 'P2009':
                throw new common_1.InternalServerErrorException(`Failed query validation`);
            case 'P2010':
                throw new common_1.BadRequestException(`Raw query failed`);
            case 'P2011':
                throw new common_1.BadRequestException(`Null constraint violation on ${record}`);
            case 'P2012':
                throw new common_1.BadRequestException(`${record} missing required value`);
            case 'P2013':
                throw new common_1.BadRequestException(`Missing required argument for ${record}`);
            case 'P2014':
                throw new common_1.ConflictException(`Invalid relation: ${record} has conflicting records`);
            case 'P2015':
                throw new common_1.NotFoundException(`Related ${record} not found`);
            case 'P2016':
                throw new common_1.BadRequestException(`Query interpretation error`);
            case 'P2017':
                throw new common_1.ConflictException(`Relation record not found for ${record}`);
            case 'P2018':
                throw new common_1.NotFoundException(`Required connected records not found`);
            case 'P2019':
                throw new common_1.BadRequestException(`Input error`);
            case 'P2020':
                throw new common_1.BadRequestException(`Value out of range for ${record}`);
            case 'P2021':
                throw new common_1.NotFoundException(`Table ${record} not found`);
            case 'P2022':
                throw new common_1.NotFoundException(`Column for ${record} not found`);
            case 'P2023':
                throw new common_1.InternalServerErrorException(`Inconsistent column data`);
            case 'P2024':
                throw new common_1.InternalServerErrorException(`Timed out fetching ${record}`);
            case 'P2025':
                throw new common_1.NotFoundException(`${record} not found`);
            case 'P2026':
                throw new common_1.InternalServerErrorException(`Unsupported feature requested`);
            case 'P2027':
                throw new common_1.InternalServerErrorException(`Multiple errors occurred during query`);
            case 'P2028':
                throw new common_1.InternalServerErrorException(`Transaction API error`);
            case 'P2030':
                throw new common_1.InternalServerErrorException(`Database schema is out of date`);
            case 'P2033':
                throw new common_1.BadRequestException(`Number out of range for ${record}`);
            case 'P2034':
                throw new common_1.ForbiddenException(`Transaction was aborted`);
            default:
                throw new common_1.InternalServerErrorException(`Database error: ${error.message}`);
        }
    }
    if (error instanceof handle_error_app_1.AppError) {
        switch (error.code) {
            case 400:
                throw new common_1.BadRequestException(error.message);
            case 401:
                throw new common_1.UnauthorizedException(error.message);
            case 403:
                throw new common_1.ForbiddenException(error.message);
            case 404:
                throw new common_1.NotFoundException(error.message);
            case 409:
                throw new common_1.ConflictException(error.message);
            default:
                throw new common_1.InternalServerErrorException(error.message);
        }
    }
    if (error instanceof axios_1.AxiosError) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Axios request failed';
        switch (status) {
            case 400:
                throw new common_1.BadRequestException(message);
            case 401:
                throw new common_1.UnauthorizedException(message);
            case 403:
                throw new common_1.ForbiddenException(message);
            case 404:
                throw new common_1.NotFoundException(message);
            case 409:
                throw new common_1.ConflictException(message);
            case 422:
                throw new common_1.UnprocessableEntityException(message);
            default:
                throw new common_1.InternalServerErrorException(message);
        }
    }
    throw new common_1.InternalServerErrorException(error.message || customMessage);
}
//# sourceMappingURL=handle-error.simplify.js.map