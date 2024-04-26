import * as vscode from 'vscode';

export class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
}

// Define a classe do provedor de árvore para os cubos
export class TreeProvider implements vscode.TreeDataProvider<TreeItem> {
    private cubes: string[];

    constructor(cubes: string[]) {
        this.cubes = cubes;
    }

    // Método para fornecer os itens principais da árvore
    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    // Método para fornecer os itens filhos da árvore
    getChildren(element?: TreeItem): vscode.ProviderResult<TreeItem[]> {
        if (!element) {
            // Retorna os nomes dos cubos como itens principais da árvore
            return this.cubes.map(cube => new TreeItem(cube, vscode.TreeItemCollapsibleState.None));
        }
        return null; // Não temos subníveis
    }

    // Método para atualizar a visualização da árvore
    refresh(): void {
        // Emitimos um evento para indicar que os dados da árvore foram alterados
        this._onDidChangeTreeData.fire();
    }

    // Evento que indica quando os dados da árvore foram alterados
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
}
