import * as vscode from 'vscode';
import * as fs from 'fs';

export async function createAndOpenFile(filePath: string, content: string): Promise<void> {
    await fs.promises.writeFile(filePath, content);
    const document = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(document);
}