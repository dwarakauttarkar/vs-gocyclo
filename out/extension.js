"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
let statusBarItem;
let showStatusBar;
function activate(context) {
    console.log('Congratulations, your extension "gocyclo" is now active!!!');
    context.subscriptions.push(vscode.commands.registerCommand("gocyclo.runGoCycle", () => {
        vscode.window.showInformationMessage("Yeah the complexity is 20 for selected lines");
    }));
    context.subscriptions.push(vscode.commands.registerCommand("gocyclo.toggleStatus", () => {
        showStatusBar = !showStatusBar;
        updateStatusBarItem();
    }));
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'gocyclo.runGoCycle';
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
    showStatusBar = true;
    updateStatusBarItem();
}
exports.activate = activate;
function updateStatusBarItem() {
    if (!showStatusBar) {
        statusBarItem.hide();
        return;
    }
    const n = getComplexityForSelectedText(vscode.window.activeTextEditor);
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    if (n > 0) {
        statusBarItem.text = 'Cyclomatic complexity of selected text is: ' + n;
        statusBarItem.show();
    }
    else {
        statusBarItem.text = 'Cyclomatic complexity of this GO file is: ' + getTotalLinesInFile(vscode.window.activeTextEditor);
        statusBarItem.show();
    }
}
function deactivate() { }
exports.deactivate = deactivate;
function getComplexityForSelectedText(editor) {
    let lines = 0;
    if (editor) {
        lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
    }
    return lines;
}
function getTotalLinesInFile(editor) {
    let totLines = 0;
    if (editor) {
        totLines = editor.document.lineCount;
    }
    return totLines;
}
//# sourceMappingURL=extension.js.map