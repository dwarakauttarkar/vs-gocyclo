import * as vscode from 'vscode';
import * as child from 'child_process';
import {getCyclomaticThresholdDescription} from './cyclomatic/threshold';
import {getActiveFilePath} from './utils/utils';
import {Stat, Column} from './entities/stat';

var stringTable = require('string-table');

// Global UI Components
let statusBarItem: vscode.StatusBarItem;
let outputChannel: vscode.OutputChannel;

let showStatusBar: boolean = true;
let averageComplexity: string;
let goPath: string;

// commands
const commandToggleStatus = "gocyclo.toggleStatus";
const commandTotalComplexity = "gocyclo.getTotalComplexity";

// common constants
const goCycloBinaryPath = "/tmp/gocyclo/gocyclo";
const goCycloLibraryGitUrl = "github.com/dwarakauttarkar/gocyclo/cmd/gocyclo@latest";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("gocyclo.runGoCycle", (folderUri : vscode.Uri) => {
		console.log(folderUri);
		showTotalComplexityInTerminal(folderUri.path);
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

function updateStatusBarItem(): void{
	if(!showStatusBar){
		statusBarItem.hide();
		return;
	}
	if(vscode.window.activeTextEditor){
		let fileExt = vscode.window.activeTextEditor.document.uri.fsPath.split(".").pop();
		if(fileExt !== "go"){
			statusBarItem.hide();
			return;
		}
	}
	publishAverageComplexityToStatusBar();
}

export function deactivate() {}

function publishAverageComplexityToStatusBar(){
	let currentFilepath = getActiveFilePath();
	let command = goCycloBinaryPath + " -avg "+currentFilepath;
	child.exec(command, function(error,stdout,stdin){
		try{
			let avgScoreObj=JSON.parse(stdout);
			averageComplexity  = avgScoreObj.average;
			statusBarItem.text = '$(getting-started-beginner) Avg Cyclomatic: ' + averageComplexity;
			statusBarItem.tooltip = "Click here to get function level analysis";
			statusBarItem.show();
		}catch(exception){
			console.error(exception);
		}		
	});
}

function setup(){	
	// setting up go path in global variable
	let workspace = vscode.workspace.getConfiguration();
	let allAsJSON = JSON.parse(JSON.stringify(workspace));
	goPath = allAsJSON.go.gopath;
	
	// installing go cyclo if not already available
	child.exec('go install ' + goCycloLibraryGitUrl, function(error,stdout,stdin){
		if(error !== undefined){
			console.error(error);
		}else{
			console.log("setup goCyclo completed");
		}
	});

	// creating tmp folder if not available
	child.exec('mkdir -p /tmp/gocyclo', function(error,stdout,stdin){
		if(error !== undefined){
			console.error(error);
		}else{
			console.log("setup tmp folder completed");
		}
	});

	// moving the gocyclo binary to tmp folder
	child.exec('mv '+goPath+'/bin/gocyclo /tmp/gocyclo', function(error,stdout,stdin){
		if(error !== undefined){
			console.error(error);
		}else{
			console.log("setup tmp folder completed");
		}
	});
}

function showTotalComplexityInTerminal(currentFilePath: string = getActiveFilePath()){

	let command = goCycloBinaryPath + " -top 1000 " + currentFilePath;
	child.exec(command, function(error,stdout,stdin){
		const stats : Stat[] = JSON.parse(stdout);
		for(let i=0; i<stats.length; i++){
			stats[i].Remark = getCyclomaticThresholdDescription(stats[i].Complexity)
		}
		console.log(stats);
		outputChannel = getClearOutPutChannel();
		printTotalComplexityMetadata(outputChannel);
		outputChannel.appendLine("Function Level Analysis");
		let out:string = stringTable.create(stats, {
			headers: [Column.PKGNAME, Column.FUNCNAME, Column.COMPLEXITY,Column.REMARK],
			capitalizeHeaders: true,
		});
		outputChannel.appendLine(out);
		outputChannel.show();
	});
}

function getClearOutPutChannel(): vscode.OutputChannel{
	if(outputChannel === undefined || outputChannel === null){
		outputChannel = vscode.window.createOutputChannel("GoCyclo");
	}
	outputChannel.clear();
	return outputChannel;
}

function printTotalComplexityMetadata(outputChannel : vscode.OutputChannel){
	outputChannel.appendLine("Average Cyclomatic Complexity: "+averageComplexity + "\n");
	outputChannel.appendLine("Thresholds:");
	outputChannel.appendLine("[1-10: GOOD]; [11-20: MODERATE]; [21-30: COMPLEX]; [31-40: EXTREMELY COMPLEX]; [40+: INSANE !] \n");
}
