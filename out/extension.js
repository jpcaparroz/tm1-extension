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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const fs_1 = __importDefault(require("fs"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    console.log(__dirname);
    const filePath = 'e:/Filipe/prog/repo/tm1-extension/src/processes.json';
    // const filePath = '../../src/processes.json';
    function readJSONFile(filePath) {
        const data = fs_1.default.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    const processList = readJSONFile(filePath);
    let processes = processList.value.map((process) => {
        return process;
    });
    let processesNames = processList.value.map((process) => {
        console.log(process.Name);
        return process;
    });
    // console.log(processes);
    let disposable = vscode.commands.registerCommand('tm1-extension.tm1Test', () => {
        console.log('teste');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map