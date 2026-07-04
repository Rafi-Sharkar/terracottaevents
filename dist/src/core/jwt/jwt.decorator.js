"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.Public = exports.Roles = void 0;
exports.ValidateAuth = ValidateAuth;
exports.ValidateSuperAdmin = ValidateSuperAdmin;
exports.ValidateAdmin = ValidateAdmin;
exports.ValidateUser = ValidateUser;
const user_enum_1 = require("../../common/enum/user.enum");
const common_1 = require("@nestjs/common");
const jwt_constants_1 = require("./jwt.constants");
const jwt_guard_1 = require("./jwt.guard");
const Roles = (...roles) => (0, common_1.SetMetadata)(jwt_constants_1.ROLES_KEY, roles);
exports.Roles = Roles;
const Public = () => (0, common_1.SetMetadata)(jwt_constants_1.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user)
        return undefined;
    if (!data)
        return user;
    return user[data];
});
function ValidateAuth(...roles) {
    const decorators = [(0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, jwt_guard_1.RolesGuard)];
    if (roles.length > 0) {
        decorators.push((0, exports.Roles)(...roles));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
function ValidateSuperAdmin() {
    return ValidateAuth(user_enum_1.UserEnum.SUPER_ADMIN);
}
function ValidateAdmin() {
    return ValidateAuth(user_enum_1.UserEnum.ADMIN, user_enum_1.UserEnum.SUPER_ADMIN);
}
function ValidateUser() {
    return ValidateAuth(user_enum_1.UserEnum.USER);
}
//# sourceMappingURL=jwt.decorator.js.map