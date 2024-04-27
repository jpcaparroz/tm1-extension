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

export class TreeProvider implements vscode.TreeDataProvider<TreeItem> {
    private objects: string[];

    constructor(objects: string[]) {
        this.objects = objects;
    }

    // Método para fornecer os itens principais da árvore
    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    // Método para fornecer os itens filhos da árvore
    getChildren(element?: TreeItem): vscode.ProviderResult<TreeItem[]> {
        if (!element) {
            // Retorna os nomes dos objetos como itens principais da árvore
            return this.objects.map(object => {
                // Aqui você pode definir o comando para cada item se desejar
                const command: vscode.Command = {
                    title: 'Load ProcessScript',
                    command: 'tm1-extension.treeItemClick', // Nome do comando registrado na extensão
                    arguments: [object] // Argumentos opcionais que você pode passar para a ação
                };
                return new TreeItem(object, vscode.TreeItemCollapsibleState.None, command);
            });
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
