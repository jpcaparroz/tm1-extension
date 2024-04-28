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
const cube_object_1 = require("./objects/cube-object");
const process_object_1 = require("./objects/process-object");
const dimension_object_1 = require("./objects/dimension-object");
const chore_object_1 = require("./objects/chore-object");
const authenticator_1 = require("./services/authenticator");
const connection = credentials.GO_New_Stores;
async function activate(context) {
    let loadAllTree = vscode.commands.registerCommand('tm1-extension.loadTree', async () => {
        const tm1Service = await (0, authenticator_1.authenticate)(connection);
        const cubeItemProvider = new cube_object_1.CubeItemProvider(tm1Service);
        const controlCubeItemProvider = new cube_object_1.CubeItemProvider(tm1Service, true);
        const dimensionItemProvider = new dimension_object_1.DimensionItemProvider(tm1Service);
        const controlDimensionItemProvider = new dimension_object_1.DimensionItemProvider(tm1Service, true);
        const processeItemProvider = new process_object_1.ProcessItemProvider(tm1Service);
        const controlProcesseItemProvider = new process_object_1.ProcessItemProvider(tm1Service, true);
        const choreItemProvider = new chore_object_1.ChoreItemProvider(tm1Service);
        vscode.window.createTreeView('package-cubes', { treeDataProvider: cubeItemProvider });
        vscode.window.createTreeView('package-control-cubes', { treeDataProvider: controlCubeItemProvider });
        vscode.window.createTreeView('package-dimensions', { treeDataProvider: dimensionItemProvider });
        vscode.window.createTreeView('package-control-dimensions', { treeDataProvider: controlDimensionItemProvider });
        vscode.window.createTreeView('package-processes', { treeDataProvider: processeItemProvider });
        vscode.window.createTreeView('package-control-processes', { treeDataProvider: controlProcesseItemProvider });
        vscode.window.createTreeView('package-chores', { treeDataProvider: choreItemProvider });
    });
    context.subscriptions.push(loadAllTree);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map