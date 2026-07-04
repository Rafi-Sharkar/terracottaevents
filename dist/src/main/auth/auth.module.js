"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const twilio_service_1 = require("../../lib/twilio/twilio.service");
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_get_profile_service_1 = require("./services/auth-get-profile.service");
const auth_login_service_1 = require("./services/auth-login.service");
const auth_logout_service_1 = require("./services/auth-logout.service");
const auth_otp_service_1 = require("./services/auth-otp.service");
const auth_password_service_1 = require("./services/auth-password.service");
const auth_register_service_1 = require("./services/auth-register.service");
const auth_update_profile_service_1 = require("./services/auth-update-profile.service");
const google_auth_service_1 = require("./services/google-auth.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_register_service_1.AuthRegisterService,
            auth_login_service_1.AuthLoginService,
            auth_logout_service_1.AuthLogoutService,
            auth_otp_service_1.AuthOtpService,
            auth_password_service_1.AuthPasswordService,
            auth_get_profile_service_1.AuthGetProfileService,
            auth_update_profile_service_1.AuthUpdateProfileService,
            google_auth_service_1.GoogleAuthService,
            twilio_service_1.TwilioService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map