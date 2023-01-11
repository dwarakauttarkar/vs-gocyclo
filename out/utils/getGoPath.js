"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substituteEnv = exports.resolveHomeDir = exports.resolvePath = exports.getInferredGopath = exports.getWorkspaceFolderPath = exports.fixDriveCasingInWindows = exports.getCurrentGoPath = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
const path = require("path");
const fs = require("fs");
const os = require("os");
let currentGopath = '';
function getCurrentGoPath(workspaceUri) {
    const activeEditorUri = vscode.window.activeTextEditor?.document.uri;
    const currentFilePath = fixDriveCasingInWindows(activeEditorUri?.fsPath ?? '');
    const currentRoot = (workspaceUri && workspaceUri.fsPath) || getWorkspaceFolderPath(activeEditorUri) || '';
    const config = (0, config_1.getGoConfig)(workspaceUri || activeEditorUri);
    // Infer the GOPATH from the current root or the path of the file opened in current editor
    // Last resort: Check for the common case where GOPATH itself is opened directly in VS Code
    let inferredGopath;
    if (config['inferGopath'] === true) {
        inferredGopath = getInferredGopath(currentRoot) || getInferredGopath(currentFilePath);
        if (!inferredGopath) {
            try {
                if (fs.statSync(path.join(currentRoot, 'src')).isDirectory()) {
                    inferredGopath = currentRoot;
                }
            }
            catch (e) {
                // No op
            }
        }
        if (inferredGopath) {
            // inferred GOPATH must not have go.mod in it.
            try {
                if (fs.existsSync(path.join(inferredGopath, 'go.mod'))) {
                    inferredGopath = '';
                }
            }
            catch (e) {
                // No op
            }
        }
        if (inferredGopath && process.env['GOPATH'] && inferredGopath !== process.env['GOPATH']) {
            inferredGopath += path.delimiter + process.env['GOPATH'];
        }
    }
    const configGopath = config['gopath'] ? resolvePath(substituteEnv(config['gopath']), currentRoot) : '';
    currentGopath = (inferredGopath ? inferredGopath : configGopath || process.env['GOPATH']) ?? '';
    return currentGopath;
}
exports.getCurrentGoPath = getCurrentGoPath;
// Workaround for issue in https://github.com/Microsoft/vscode/issues/9448#issuecomment-244804026
function fixDriveCasingInWindows(pathToFix) {
    return process.platform === 'win32' && pathToFix
        ? pathToFix.substr(0, 1).toUpperCase() + pathToFix.substr(1)
        : pathToFix;
}
exports.fixDriveCasingInWindows = fixDriveCasingInWindows;
function getWorkspaceFolderPath(fileUri) {
    if (fileUri) {
        const workspace = vscode.workspace.getWorkspaceFolder(fileUri);
        if (workspace) {
            return fixDriveCasingInWindows(workspace.uri.fsPath);
        }
    }
    // fall back to the first workspace
    const folders = vscode.workspace.workspaceFolders;
    if (folders && folders.length) {
        return fixDriveCasingInWindows(folders[0].uri.fsPath);
    }
    return undefined;
}
exports.getWorkspaceFolderPath = getWorkspaceFolderPath;
// Walks up given folder path to return the closest ancestor that has `src` as a child
function getInferredGopath(folderPath) {
    if (!folderPath) {
        return;
    }
    const dirs = folderPath.toLowerCase().split(path.sep);
    // find src directory closest to given folder path
    const srcIdx = dirs.lastIndexOf('src');
    if (srcIdx > 0) {
        return folderPath.substr(0, dirs.slice(0, srcIdx).join(path.sep).length);
    }
}
exports.getInferredGopath = getInferredGopath;
function resolvePath(inputPath, workspaceFolder) {
    if (!inputPath || !inputPath.trim()) {
        return inputPath;
    }
    if (!workspaceFolder && vscode.workspace.workspaceFolders) {
        workspaceFolder = getWorkspaceFolderPath(vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri);
    }
    if (workspaceFolder) {
        inputPath = inputPath.replace(/\${workspaceFolder}|\${workspaceRoot}/g, workspaceFolder);
        inputPath = inputPath.replace(/\${workspaceFolderBasename}/g, path.basename(workspaceFolder));
    }
    return resolveHomeDir(inputPath);
}
exports.resolvePath = resolvePath;
function resolveHomeDir(inputPath) {
    if (!inputPath || !inputPath.trim()) {
        return inputPath;
    }
    return inputPath.startsWith('~') ? path.join(os.homedir(), inputPath.substr(1)) : inputPath;
}
exports.resolveHomeDir = resolveHomeDir;
function substituteEnv(input) {
    return input.replace(/\${env:([^}]+)}/g, (match, capture) => {
        return process.env[capture.trim()] || '';
    });
}
exports.substituteEnv = substituteEnv;
//# sourceMappingURL=getGoPath.js.map