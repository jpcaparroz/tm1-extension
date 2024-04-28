import * as vscode from 'vscode';
import * as path from 'path';
import * as credentials from './assets/examples/applications.json';

import { authenticate } from './services/authenticator';

import { TM1Service } from 'tm1js';
import { CubeItem, CubeItemProvider } from './objects/cube-object';
import { loadTreeCube } from './services/cube-service';

const connection = credentials.planner

export async function activate(context: vscode.ExtensionContext) {
    let loadAllTree = vscode.commands.registerCommand('tm1-extension.loadTree', async () => {
        const tm1Service: TM1Service = await authenticate(connection);

        const cubeItemProvider = new CubeItemProvider(tm1Service);

        
        vscode.window.createTreeView<CubeItem>('package-cubes', { treeDataProvider: cubeItemProvider });
    });

    context.subscriptions.push(loadAllTree)
}

export function deactivate() { }