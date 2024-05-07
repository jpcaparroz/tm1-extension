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
    } catch (error) {
        window.showErrorMessage(`Error opening cube rule: ${error}`);
    }
}

async function saveRuleOfCubeItem(cubeItem: CubeItem, tm1Serivce: TM1Service) {

    try {
        const cube = tm1Serivce.cubes.get(cubeItem.cube.name)
        cube.
        
    } catch (error) {
        
    }

}