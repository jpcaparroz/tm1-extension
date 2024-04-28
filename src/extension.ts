import * as vscode from 'vscode';
import * as credentials from './assets/examples/applications.json';
import { authenticate } from './services/authenticator';
import { TM1Service } from 'tm1js';
import { TreeItem, TreeProvider } from './services/tree-provider';
import { typesOfObjects } from './services/object-types-call';
import * as path from 'path';
import { createAndOpenFile } from './services/create-file';

export async function activate(context: vscode.ExtensionContext) {
    let loadTree = vscode.commands.registerCommand('tm1-extension.loadTree', async () => {
        const tm1Service: TM1Service = await authenticate(credentials.GO_New_Stores);
        typesOfObjects.forEach(async ({ name, method, control }) => {
            const items = await tm1Service[name][method]();            
            const treeProvider = new TreeProvider(items);
            const viewId = control ? `package-control-${name}` : `package-${name}`;
            vscode.window.createTreeView(viewId, { treeDataProvider: treeProvider });
        });
    });
    context.subscriptions.push(loadTree);

    let treeItemClick = vscode.commands.registerCommand('tm1-extension.treeItemClick', async (treeItem: TreeItem) => {
        const tm1Service: TM1Service = await authenticate(credentials.GO_New_Stores);

        const process = await tm1Service.processes.get(treeItem)
        const content = `#Section Prolog\n${process.prologProcedure}\n
            #Section Metadata\n${process.metadataProcedure}\n
            #Section Data\n${process.dataProcedure}\n
            #Section Epilog\n${process.epilogProcedure}
        `;
        const fileName = `${treeItem}.pro`;
        const folderPath = path.join(context.extensionPath, 'src', 'temp');
        const filePath = folderPath ? path.join(folderPath, fileName) : '';

        if (filePath) {
            await createAndOpenFile(filePath, content);
        } else {
            vscode.window.showErrorMessage('Unable to create file. No workspace folder found.');
        }
    });
    context.subscriptions.push(treeItemClick);
}

export function deactivate() { }