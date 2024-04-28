import * as vscode from 'vscode';
import * as credentials from './assets/examples/applications.json';
import { authenticate } from './services/authenticator';
import { TM1Service } from 'tm1js';

import { CubeItem, CubeItemProvider } from './objects/cube-object';
import { ProcessItem, ProcessItemProvider } from './objects/process-object';
import { DimensionItem, DimensionItemProvider } from './objects/dimension-object';
import { ChoreItem, ChoreItemProvider } from './objects/chore-object';

const connection = credentials.GO_New_Stores

export async function activate(context: vscode.ExtensionContext) {
    let loadAllTree = vscode.commands.registerCommand('tm1-extension.loadTree', async () => {
        const tm1Service: TM1Service = await authenticate(connection);

        const cubeItemProvider = new CubeItemProvider(tm1Service);
        const dimensionItemProvider = new DimensionItemProvider(tm1Service);
        const processeItemProvider = new ProcessItemProvider(tm1Service);
        const choreItemProvider = new ChoreItemProvider(tm1Service);

        vscode.window.createTreeView<CubeItem>('package-cubes', { treeDataProvider: cubeItemProvider });
        vscode.window.createTreeView<DimensionItem>('package-dimensions', { treeDataProvider: dimensionItemProvider });
        vscode.window.createTreeView<ProcessItem>('package-processes', { treeDataProvider: processeItemProvider });
        vscode.window.createTreeView<ChoreItem>('package-chores', { treeDataProvider: choreItemProvider });
    });

    context.subscriptions.push(loadAllTree)
}

export function deactivate() { }