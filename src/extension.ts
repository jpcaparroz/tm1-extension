import * as vscode from 'vscode';
import * as credentials from './assets/examples/applications.json';
import { authenticate } from './services/authenticator';
import { TM1Service } from 'tm1js';
import { TreeProvider } from './services/tree-provider';

export async function activate(context: vscode.ExtensionContext) {
    // let disposable = vscode.commands.registerCommand('tm1-extension.tm1Test', async () => {
    //     vscode.window.showInformationMessage('Hello, World!');
    //     const tm1Service: TM1Service = await authenticate(credentials.GO_New_Stores);
        
    //     // Lista de tipos de objetos e os respectivos métodos para obter os nomes
    //     const typesOfObjects = [
    //         { name: 'Cubes', method: 'getAllModelNames' },
    //         { name: 'Cubes', method: 'getAllControlNames' },
    //         { name: 'Dimensions', method: 'getAllNames' },
    //         { name: 'Processes', method: 'getAllNames' },
    //         { name: 'Chores', method: 'getAllNames' }
    //     ];

    //     // Criar provedores de árvore para cada tipo de objeto
    //     typesOfObjects.forEach(async ({ name, method }) => {
    //         const items = await tm1Service[name.toLowerCase()][method]();
    //         const treeProvider = new TreeProvider(items);
    //         vscode.window.createTreeView(`package-${name.toLowerCase()}`, { treeDataProvider: treeProvider });
    //     });
    // });
    // context.subscriptions.push(disposable);
}

export function deactivate() { }
