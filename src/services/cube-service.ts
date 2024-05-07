import { window, Uri, Position, workspace } from 'vscode';
import { TM1Service } from "tm1js";
import { CubeItem } from "../objects/cube-object";

export async function openRuleOfCubeItem(cubeItem: CubeItem, tm1Serivce: TM1Service) {
    try {
        const rule = cubeItem.cube.rules?.toString();

        if (rule === undefined) {
            window.showErrorMessage('This cube has no rules.');
            return;
        }

        const textDocument = await window.showTextDocument(Uri.parse(`untitled:${cubeItem.cube.name}.rux`));

        if (textDocument) {
            textDocument.edit(editBuilder => {
                editBuilder.insert(new Position(0, 0), rule);
            });
        }

        workspace.onDidSaveTextDocument((savedDocument) => {
            if (savedDocument === textDocument.document) {
                saveRuleOfCubeItem(cubeItem, tm1Serivce, textDocument.document.getText());
            }
        });
    } catch (error) {
        window.showErrorMessage(`Error opening cube rule: ${error}`);
    }
}

async function saveRuleOfCubeItem(cubeItem: CubeItem, tm1Serivce: TM1Service, content: string) {
    try {
        tm1Serivce.cubes.update_or_create_rule(cubeItem.cube.name, content);
    } catch (error) {
        window.showErrorMessage(`Error saving cube rule: ${error}`);
    }

}