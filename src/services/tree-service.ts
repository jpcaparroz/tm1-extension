import { TreeDataProvider, TreeView, commands, window, Uri, Position } from 'vscode';
import { TM1Service } from "tm1js";
import { ChoreItemProvider } from "../objects/chore-object";
import { CubeItem, CubeItemProvider } from "../objects/cube-object";
import { DimensionItemProvider } from "../objects/dimension-object";
import { ProcessItemProvider } from "../objects/process-object";

export enum ItemProviderType {
    CubeItemProvider = 1,
    ControlCubeItemProvider = 2,
    DimensionItemProvider = 3,
    ControlDimensionItemProvider = 4,
    ProcessItemProvider = 5,
    ControlProcessItemProvider = 6,
    ChoreItemProvider = 7
}

export class TreeService {
    private itemProviderType: { [key in ItemProviderType]: CubeItemProvider | DimensionItemProvider | ProcessItemProvider | ChoreItemProvider };

    constructor(tm1Service: TM1Service) {
        this.itemProviderType = {
            [ItemProviderType.CubeItemProvider]: new CubeItemProvider(tm1Service),
            [ItemProviderType.ControlCubeItemProvider]: new CubeItemProvider(tm1Service, true),
            [ItemProviderType.DimensionItemProvider]: new DimensionItemProvider(tm1Service),
            [ItemProviderType.ControlDimensionItemProvider]: new DimensionItemProvider(tm1Service, true),
            [ItemProviderType.ProcessItemProvider]: new ProcessItemProvider(tm1Service),
            [ItemProviderType.ControlProcessItemProvider]: new ProcessItemProvider(tm1Service, true),
            [ItemProviderType.ChoreItemProvider]: new ChoreItemProvider(tm1Service)
        };

        this.loadAllTree();
        this.registerCubeItemClickCommand();
    }

    private loadAllTree() {
        commands.registerCommand('tm1-extension.loadTree', async () => {
            this.loadTree('package-cubes', ItemProviderType.CubeItemProvider);
            this.loadTree('package-control-cubes', ItemProviderType.ControlCubeItemProvider);
            this.loadTree('package-dimensions', ItemProviderType.DimensionItemProvider);
            this.loadTree('package-control-dimensions', ItemProviderType.ControlDimensionItemProvider);
            this.loadTree('package-processes', ItemProviderType.ProcessItemProvider);
            this.loadTree('package-control-processes', ItemProviderType.ControlProcessItemProvider);
            this.loadTree('package-chores', ItemProviderType.ChoreItemProvider);
        });
    }

    loadTree(viewId: string, object: ItemProviderType): TreeView<any> {
        const provider = this.itemProviderType[object] as TreeDataProvider<any>;
        return window.createTreeView(viewId, { treeDataProvider: provider });
    }

    private registerCubeItemClickCommand() {
        commands.registerCommand('tm1-extension.cubeItemClick', (cubeItem: CubeItem) => {
            this.openCubeItemContent(cubeItem);
        });
    }

    private async openCubeItemContent(cubeItem: CubeItem) {
        try {
            const rule = cubeItem.cube.rules;
            const textDocument = await window.showTextDocument(Uri.parse(`untitled:${cubeItem.cube.name}.rux`));

            if (textDocument) {
                textDocument.edit(editBuilder => {
                    editBuilder.insert(new Position(0, 0), JSON.stringify(rule, null, 2));
                });
            }
        } catch (error) {
            window.showErrorMessage(`Error opening cube item content: ${error}`);
        }
    }
}