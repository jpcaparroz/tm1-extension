import * as vscode from 'vscode';
import * as path from 'path';
import * as tm1js from 'tm1js';
import * as credentials from './assets/examples/applications.json';
import { connectToTM1 } from './services/authenticator';

// async function createTreeViewNodes(jsonContent: any): Promise<vscode.TreeItem[]> {

// 	// tm1js.TM1Service.connect(credentials.)
// 	const names = jsonContent.value.map((item: any) => item.Name);

// 	return names.map((name: string) => {
// 		return new vscode.TreeItem(name, vscode.TreeItemCollapsibleState.Collapsed);
// 	});
// }


// class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
// 	constructor(private readonly extensionPath: string, private readonly fileName: string) { }

// 	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
// 		return element;
// 	} 

// 	getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
// 		if (!element) {
// 			// const filePath = path.join(this.extensionPath, 'src', 'assets', 'examples', this.fileName);
// 			const jsonContent = credentials;

// 			const treeNodes = createTreeViewNodes(jsonContent);

// 			return Promise.resolve(treeNodes);
// 		}
// 		return Promise.resolve([]);
// 	}
// }

// export function activate(context: vscode.ExtensionContext) {
// 	// const processesDataProvider = new TreeDataProvider(context.extensionPath, 'processes.json');
// 	// vscode.window.createTreeView('package-processes', { treeDataProvider: processesDataProvider });

// 	const cubesDataProvider = new TreeDataProvider(context.extensionPath, 'cubes.json');
// 	vscode.window.createTreeView('package-cubes', { treeDataProvider: cubesDataProvider });
// }

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('tm1-extension.tm1Test', () => {
        vscode.window.showInformationMessage('Hello, World!');

        tm1js.
    });
    context.subscriptions.push(disposable);
}

export function deactivate() { }