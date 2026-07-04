"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
let UtilsService = class UtilsService {
    sanitizedResponse(dto, data) {
        return (0, class_transformer_1.plainToInstance)(dto, data, { excludeExtraneousValues: true });
    }
    sanitizeWithRelations(dto, entity) {
        const scalars = {};
        const relations = {};
        for (const key in entity) {
            const value = entity[key];
            if (value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value)) {
                relations[key] = value;
            }
            else if (Array.isArray(value)) {
                relations[key] = value;
            }
            else {
                scalars[key] = value;
            }
        }
        const sanitizedBase = this.sanitizedResponse(dto, scalars);
        return {
            ...sanitizedBase,
            ...relations,
        };
    }
    removeDuplicateIds(ids) {
        return Array.from(new Set(ids));
    }
    safeParseJson(value, fallback) {
        try {
            if (typeof value === 'string') {
                return JSON.parse(value);
            }
            return value ?? fallback;
        }
        catch {
            return fallback;
        }
    }
};
exports.UtilsService = UtilsService;
exports.UtilsService = UtilsService = __decorate([
    (0, common_1.Injectable)()
], UtilsService);
//# sourceMappingURL=utils.service.js.map