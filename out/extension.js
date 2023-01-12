"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const child = require("child_process");
const threshold_1 = require("./cyclomatic/threshold");
var stringTable = require('string-table');
// Global UI Components
let statusBarItem;
let outputChannel;
let showStatusBar = true;
let averageComplexity;
let goPath;
// commands
const commandToggleStatus = "gocyclo.toggleStatus";
const commandTotalComplexity = "gocyclo.getTotalComplexity";
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("gocyclo.runGoCycle", () => {
        vscode.window.showInformationMessage("Yeah the complexity is 20 for selected lines");
    }));
    context.subscriptions.push(vscode.commands.registerCommand(commandToggleStatus, () => {
        showStatusBar = !showStatusBar;
        updateStatusBarItem();
    }));
    context.subscriptions.push(vscode.commands.registerCommand(commandTotalComplexity, () => {
        showTotalComplexityInTerminal();
    }));
    setup();
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    statusBarItem.command = commandTotalComplexity;
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
    updateStatusBarItem();
}
exports.activate = activate;
function updateStatusBarItem() {
    if (!showStatusBar) {
        statusBarItem.hide();
        return;
    }
    if (vscode.window.activeTextEditor) {
        let fileExt = vscode.window.activeTextEditor.document.uri.fsPath.split(".").pop();
        if (fileExt !== "go") {
            statusBarItem.hide();
            return;
        }
    }
    publishAverageComplexityToStatusBar();
}
function deactivate() { }
exports.deactivate = deactivate;
function publishAverageComplexityToStatusBar() {
    let f = "";
    if (vscode.window.activeTextEditor) {
        f = vscode.window.activeTextEditor.document.uri.fsPath;
    }
    let command = goPath + "/bin/gocyclo -avg " + f;
    child.exec(command, function (error, stdout, stdin) {
        try {
            let avgScoreObj = JSON.parse(stdout);
            averageComplexity = avgScoreObj.average;
            statusBarItem.text = '$(getting-started-beginner) Avg Cyclomatic complexity: ' + averageComplexity;
            statusBarItem.tooltip = "Click here to get function level analysis";
            statusBarItem.show();
        }
        catch (exception) {
            console.error(exception);
            vscode.window.showErrorMessage(JSON.stringify(exception));
        }
    });
}
function setup() {
    // setting up go path in global variable
    let workspace = vscode.workspace.getConfiguration();
    let allAsJSON = JSON.parse(JSON.stringify(workspace));
    goPath = allAsJSON.go.gopath;
    // installing go cyclo if not already available
    child.exec('go install github.com/dwarakauttarkar/gocyclo/cmd/gocyclo@latest', function (error, stdout, stdin) {
        if (error !== undefined) {
            console.error(error);
        }
        else {
            console.log("setup goCyclo completed");
        }
    });
}
function showTotalComplexityInTerminal() {
    let f = "";
    if (vscode.window.activeTextEditor) {
        f = vscode.window.activeTextEditor.document.uri.fsPath;
    }
    let command = goPath + "/bin/gocyclo -top 1000 " + f;
    child.exec(command, function (error, stdout, stdin) {
        const stats = JSON.parse(stdout);
        for (let i = 0; i < stats.length; i++) {
            stats[i].Remark = (0, threshold_1.getCyclomaticThresholdDescription)(stats[i].Complexity);
        }
        if (outputChannel === undefined || outputChannel === null) {
            outputChannel = vscode.window.createOutputChannel("GoCyclo");
        }
        outputChannel.clear();
        outputChannel.appendLine("Average Cyclomatic Complexity: " + averageComplexity + "\n");
        outputChannel.appendLine("Thresholds:");
        outputChannel.appendLine("[1-10: GOOD]; [11-20: MODERATE]; [21-30: COMPLEX]; [31-40: EXTREMELY COMPLEX]; [40+: INSANE !!!] \n");
        outputChannel.appendLine("Function Level Analysis");
        let out = stringTable.create(stats, {
            headers: ['PkgName', 'FuncName', 'Complexity', 'Remark'],
            capitalizeHeaders: true,
        });
        outputChannel.appendLine(out);
        outputChannel.show();
    });
}
//# sourceMappingURL=extension.js.map