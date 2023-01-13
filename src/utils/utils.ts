import * as vscode from "vscode";

export function getActiveFilePath(): string {
    if (vscode.window.activeTextEditor) {
        return vscode.window.activeTextEditor.document.uri.fsPath;
    } else {
        return "";
    }
}
