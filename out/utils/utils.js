"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveFilePath = void 0;
const vscode = require("vscode");
function getActiveFilePath() {
    if (vscode.window.activeTextEditor) {
        return vscode.window.activeTextEditor.document.uri.fsPath;
    }
    else {
        return "";
    }
}
exports.getActiveFilePath = getActiveFilePath;
//# sourceMappingURL=utils.js.map