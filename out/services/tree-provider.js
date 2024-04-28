"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeProvider = void 0;
const vscode = __importStar(require("vscode"));
const vscode_1 = require("vscode");
class TreeProvider {
    objects;
    constructor(objects) {
        this.objects = objects;
    }
    // Método para fornecer os itens principais da árvore
    getTreeItem(element) {
        return element;
    }
    // Método para fornecer os itens filhos da árvore
    getChildren(element) {
        if (!element) {
            // Retorna os nomes dos objetos como itens principais da árvore
            return this.objects.map(object => {
                // Aqui você pode definir o comando para cada item se desejar
                const command = {
                    title: 'Load ProcessScript',
                    command: 'tm1-extension.treeItemClick', // Nome do comando registrado na extensão
                    arguments: [object] // Argumentos opcionais que você pode passar para a ação
                };
                return new vscode_1.TreeItem(object, vscode.TreeItemCollapsibleState.None);
            });
        }
        return null; // Não temos subníveis
    }
    // Método para atualizar a visualização da árvore
    refresh() {
        // Emitimos um evento para indicar que os dados da árvore foram alterados
        this._onDidChangeTreeData.fire();
    }
    // Evento que indica quando os dados da árvore foram alterados
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
}
exports.TreeProvider = TreeProvider;
//# sourceMappingURL=tree-provider.js.map