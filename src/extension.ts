import * as vscode from 'vscode';
import * as path from 'path';
import * as credentials from './assets/examples/applications.json';

import { authenticate } from './services/authenticator';

import { TM1Service } from 'tm1js';
import { CubeItem, CubeItemProvider } from './services/cubeObject';

const connection = credentials.planner

export async function activate(context: vscode.ExtensionContext) {
    let loadTree = vscode.commands.registerCommand('tm1-extension.loadTree', async () => {
        const tm1Service: TM1Service = await authenticate(connection);
        const cubeItemProvider = new CubeItemProvider(tm1Service);
        const cubes = await cubeItemProvider.getCubes(tm1Service);
        
        const treeDataProvider = new TreeDataProvider<CubeItem>();
        treeDataProvider.getChildren = () => Promise.resolve(cubes);
        vscode.window.createTreeView('tm1-cubes-view', { treeDataProvider });

    });

    context.subscriptions.push(loadTree)
}

export function deactivate() { }
