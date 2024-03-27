// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log(__dirname);
	const filePath = 'e:/Filipe/prog/repo/tm1-extension/src/processes.json';
	// const filePath = '../../src/processes.json';
	
	function readJSONFile(filePath: string): any {
		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
	}
	
	const processList = readJSONFile(filePath);

	let processes = processList.value.map((process:object) => {
		return process
	})
	let processesNames = processList.value.map((process:object) => {
		console.log(process.Name);
		return process
	})

	// console.log(processes);
	
	
	let disposable = vscode.commands.registerCommand('tm1-extension.tm1Test', () => {
		console.log('teste');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }