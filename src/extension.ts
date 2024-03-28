import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Função para carregar e analisar o arquivo JSON
function loadJSON(filePath: string) {
	const data = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(data);
}

// Função para criar os nós da tree view a partir dos nomes dos processos no JSON
function createTreeViewNodes(jsonContent: any): vscode.TreeItem[] {
	// Extrai apenas os nomes dos processos
	const names = jsonContent.value.map((item: any) => item.Name);

	// Cria os nós da tree view com base nos nomes dos processos
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
			// Carrega o conteúdo JSON do arquivo
			const filePath = path.join(this.extensionPath, 'src', 'assets', 'examples', this.fileName);
			const jsonContent = loadJSON(filePath);

			// Cria os nós da tree view com base nos nomes dos processos no JSON
			const treeNodes = createTreeViewNodes(jsonContent);

			return Promise.resolve(treeNodes);
		}
		return Promise.resolve([]);
	}
}

export function activate(context: vscode.ExtensionContext) {
	const processesDataProvider = new TreeDataProvider(context.extensionPath, 'processes.json');
	const cubesDataProvider = new TreeDataProvider(context.extensionPath, 'cubes.json');

	vscode.window.createTreeView('package-processes', { treeDataProvider: processesDataProvider });
	vscode.window.createTreeView('package-cubes', { treeDataProvider: cubesDataProvider });

	// Registrar comandos para manipular as tree views, se necessário
}

export function deactivate() { }
