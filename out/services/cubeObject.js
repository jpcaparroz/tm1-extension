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
exports.CubeItem = exports.CubeItemProvider = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
class CubeItemProvider {
    tm1Service;
    constructor(tm1Service) {
        this.tm1Service = tm1Service;
        this.tm1Service = tm1Service;
    }
    // refresh(): void {
    // 	this._onDidChangeTreeData.fire();
    // }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        }
        else {
            return Promise.resolve([]);
        }
    }
    async getCubes(tm1Service) {
        try {
            const cubeNames = await tm1Service.cubes.getAllControlNames();
            const cubes = cubeNames.map(cubeName => {
                return new CubeItem(cubeName, vscode.TreeItemCollapsibleState.None);
            });
            return cubes;
        }
        catch (error) {
            console.error('Error getting cubes:', error);
            return [];
        }
    }
}
exports.CubeItemProvider = CubeItemProvider;
class CubeItem extends vscode.TreeItem {
    name;
    collapsibleState;
    type;
    command;
    constructor(name, collapsibleState, type = 'cube', command) {
        super(name, collapsibleState);
        this.name = name;
        this.collapsibleState = collapsibleState;
        this.type = type;
        this.command = command;
    }
    iconPath = {
        light: path.join(__filename, '..', '..', 'resources', 'images', 'dark', 'cube.svg'),
        dark: path.join(__filename, '..', '..', 'resources', 'images', 'dark', 'cube.svg')
    };
    contextValue = 'dependency';
}
exports.CubeItem = CubeItem;
//# sourceMappingURL=cubeObject.js.map