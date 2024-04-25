import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as tm1js from 'tm1js';
import { getAllCubes } from './request';

function loadJSON(filePath: string) {
	const data = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(data);
}

async function createTreeViewNodes(jsonContent: any): Promise<vscode.TreeItem[]> {
	const objects = await getAllCubes();
	console.log(objects);
	
	const names = jsonContent.value.map((item: any) => item.Name);

	return names.map((name: string) => {
		return new vscode.TreeItem(name, vscode.TreeItemCollapsibleState.Collapsed);
	});
}


class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	constructor(private readonly extensionPath: string, private readonly fileName: string) { }

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
		if (!element) {
			const filePath = path.join(this.extensionPath, 'src', 'assets', 'examples', this.fileName);
			const jsonContent = loadJSON(filePath);

			const treeNodes = createTreeViewNodes(jsonContent);

			return Promise.resolve(treeNodes);
		}
		return Promise.resolve([]);
	}
}

export function activate(context: vscode.ExtensionContext) {
	// const processesDataProvider = new TreeDataProvider(context.extensionPath, 'processes.json');
	const cubesDataProvider = new TreeDataProvider(context.extensionPath, 'cubes.json');

	// vscode.window.createTreeView('package-processes', { treeDataProvider: processesDataProvider });
	vscode.window.createTreeView('package-cubes', { treeDataProvider: cubesDataProvider });

	// Registrar comandos para manipular as tree views, se necessário
}

export function deactivate() { }
