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
const credentials = __importStar(require("./assets/examples/applications.json"));
const authenticator_1 = require("./services/authenticator");
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
function activate(context) {
    let disposable = vscode.commands.registerCommand('tm1-extension.tm1Test', () => {
        vscode.window.showInformationMessage('Hello, World!');
    });
    context.subscriptions.push(disposable);
    (0, authenticator_1.connectToTM1)(credentials.GO_New_Stores);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map