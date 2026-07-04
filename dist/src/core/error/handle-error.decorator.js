"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = HandleError;
const handle_error_simplify_1 = require("./handle-error.simplify");
function HandleError(customMessage, record) {
    return function (_target, _propertyName, descriptor) {
        const method = descriptor.value;
        if (!method)
            return;
        descriptor.value = async function (...args) {
            try {
                return await method.apply(this, args);
            }
            catch (error) {
                (0, handle_error_simplify_1.simplifyError)(error, customMessage, record);
            }
        };
    };
}
//# sourceMappingURL=handle-error.decorator.js.map