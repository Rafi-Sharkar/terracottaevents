"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dev_service_1 = require("./dev.service");
const add_tokens_dto_1 = require("./dto/add-tokens.dto");
const subscribe_user_dto_1 = require("./dto/subscribe-user.dto");
let DevController = class DevController {
    devService;
    constructor(devService) {
        this.devService = devService;
    }
    getAllUsers() {
        return this.devService.getAllUsers();
    }
    deleteUser(id) {
        return this.devService.deleteUser(id);
    }
    addTokens(id, dto) {
        return this.devService.addTokens(id, dto.tokens);
    }
    subscribeUser(id, dto) {
        return this.devService.subscribeUser(id, dto.planId);
    }
};
exports.DevController = DevController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DevController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add tokens to user account (Dev only)' }),
    (0, swagger_1.ApiBody)({ type: add_tokens_dto_1.AddTokensDto }),
    (0, common_1.Post)('users/:id/add-tokens'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_tokens_dto_1.AddTokensDto]),
    __metadata("design:returntype", void 0)
], DevController.prototype, "addTokens", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Activate plan subscription and credit tokens to user (Dev only)',
    }),
    (0, swagger_1.ApiBody)({ type: subscribe_user_dto_1.SubscribeUserDto }),
    (0, common_1.Post)('users/:id/subscribe'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscribe_user_dto_1.SubscribeUserDto]),
    __metadata("design:returntype", void 0)
], DevController.prototype, "subscribeUser", null);
exports.DevController = DevController = __decorate([
    (0, swagger_1.ApiTags)('Dev'),
    (0, common_1.Controller)('dev'),
    __metadata("design:paramtypes", [dev_service_1.DevService])
], DevController);
//# sourceMappingURL=dev.controller.js.map