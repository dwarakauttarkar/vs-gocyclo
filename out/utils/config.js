"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoConfig = void 0;
const vscode = require("vscode");
/** getGoConfig is declared as an exported const rather than a function, so it can be stubbbed in testing. */
const getGoConfig = (uri) => {
    return getConfig('go', uri);
};
exports.getGoConfig = getGoConfig;
function getConfig(section, uri) {
    if (!uri) {
        if (vscode.window.activeTextEditor) {
            uri = vscode.window.activeTextEditor.document.uri;
        }
        else {
            uri = null;
        }
    }
    return vscode.workspace.getConfiguration(section, uri);
}
//# sourceMappingURL=config.js.map