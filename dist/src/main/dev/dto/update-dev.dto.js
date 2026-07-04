"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDevDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_dev_dto_1 = require("./create-dev.dto");
class UpdateDevDto extends (0, swagger_1.PartialType)(create_dev_dto_1.CreateDevDto) {
}
exports.UpdateDevDto = UpdateDevDto;
//# sourceMappingURL=update-dev.dto.js.map