"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.md5Hash = void 0;
const md5_1 = __importDefault(require("md5"));
function md5Hash(str) {
    return (0, md5_1.default)(str);
}
exports.md5Hash = md5Hash;
exports.default = {
    md5Hash
};
//# sourceMappingURL=hash.js.map