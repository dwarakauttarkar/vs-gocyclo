"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = exports.Error = void 0;
class Error {
    constructor(message, errorType) {
        this.message = message;
        this.errorType = errorType;
    }
}
exports.Error = Error;
var ErrorType;
(function (ErrorType) {
    ErrorType["FILE_NOT_FOUND"] = "fileNotFound";
    ErrorType["UNKNOWN"] = "unknown";
    ErrorType["BINARY_NOT_FOUND"] = "binaryNotFound";
    ErrorType["PARSING_ERROR"] = "parsingError";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
//# sourceMappingURL=errors.js.map