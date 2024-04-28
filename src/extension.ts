import { ExtensionContext, commands } from 'vscode';
import { TM1Service } from 'tm1js';
import * as credentials from './assets/examples/applications.json';
import { authenticate } from './services/authenticator';
import { TreeService, ItemProviderType } from './services/tree-service';

const connection = credentials.planner

export async function activate(context: ExtensionContext) {
    const tm1Service: TM1Service = await authenticate(connection);
    const treeSerivce = new TreeService(tm1Service);

    //context.subscriptions.push(loadAllTree)
}

export function deactivate() { }