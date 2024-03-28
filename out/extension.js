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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Função para carregar e analisar o arquivo JSON
function loadJSON(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}
// Função para criar os nós da tree view a partir dos nomes dos processos no JSON
function createTreeViewNodes(jsonContent) {
    // Extrai apenas os nomes dos processos
    const names = jsonContent.value.map((item) => item.Name);
    // Cria os nós da tree view com base nos nomes dos processos
    return names.map((name) => {
        return new vscode.TreeItem(name, vscode.TreeItemCollapsibleState.Collapsed);
    });
}
class TreeDataProvider {
    extensionPath;
    constructor(extensionPath) {
        this.extensionPath = extensionPath;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            // Carrega o conteúdo JSON dos arquivos
            const jsonFiles = ['processes.json', 'cubes.json'];
            const jsonContents = jsonFiles.map((fileName) => {
                const filePath = path.join(this.extensionPath, 'src', 'assets', 'examples', fileName);
                return loadJSON(filePath);
            });
            // Cria os nós da tree view com base nos nomes dos processos no JSON
            const treeNodes = jsonContents.flatMap((jsonContent) => {
                return createTreeViewNodes(jsonContent);
            });
            return Promise.resolve(treeNodes);
        }
        return Promise.resolve([]);
    }
}
function activate(context) {
    const treeDataProvider = new TreeDataProvider(context.extensionPath);
    vscode.window.createTreeView('package-processes', { treeDataProvider });
    // Registrar comandos para manipular a tree view, se necessário
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map