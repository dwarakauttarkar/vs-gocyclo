"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentGoPath = void 0;
const vscode = require("vscode");
const getCurrentGoPath = () => {
    return () => {
        const gopath = utilGetCurrentGoPath();
        let msg = `${gopath} is the current GOPATH.`;
        const wasInfered = getGoConfig()['inferGopath'];
        const root = getWorkspaceFolderPath(vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri);
        // not only if it was configured, but if it was successful.
        if (wasInfered && root && root.indexOf(gopath) === 0) {
            const inferredFrom = vscode.window.activeTextEditor ? 'current folder' : 'workspace root';
            msg += ` It is inferred from ${inferredFrom}`;
        }
        vscode.window.showInformationMessage(msg);
        return gopath;
    };
};
exports.getCurrentGoPath = getCurrentGoPath;
//# sourceMappingURL=getCurrentGoPath.js.map