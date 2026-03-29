import * as vscode from "vscode";

export function getActiveFilePath(): string {
    if (vscode.window.activeTextEditor) {
        return vscode.window.activeTextEditor.document.uri.path;
    } else {
        return "";
    }
}

export function getActiveWorkspacePath(): string | undefined {
  const fileName = vscode.window.activeTextEditor?.document.fileName;
  return vscode.workspace.workspaceFolders?.map((folder) => folder.uri.fsPath).filter((fsPath) => fileName?.startsWith(fsPath))[0];
}
