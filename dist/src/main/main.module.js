"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload-s3/upload.module");
const vps_fileupload_module_1 = require("./vps-fileupload/vps-fileupload.module");
const dev_module_1 = require("./dev/dev.module");
const plan_module_1 = require("./plan/plan.module");
const booking_module_1 = require("./booking/booking.module");
let MainModule = class MainModule {
};
exports.MainModule = MainModule;
exports.MainModule = MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            vps_fileupload_module_1.VpsFileUploadModule,
            dev_module_1.DevModule,
            plan_module_1.PlanModule,
            booking_module_1.BookingModule,
        ],
    })
], MainModule);
//# sourceMappingURL=main.module.js.map