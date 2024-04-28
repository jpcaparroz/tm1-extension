import { TreeDataProvider, TreeView, commands, window } from 'vscode';
import { TM1Service } from "tm1js";
import { ChoreItemProvider } from "../objects/chore-object";
import { CubeItemProvider } from "../objects/cube-object";
import { DimensionItemProvider } from "../objects/dimension-object";
import { ProcessItemProvider } from "../objects/process-object";

export enum ItemProviderType {
    CubeItemProvider = 1,
    DimensionItemProvider = 2,
    ProcessItemProvider = 3,
    ChoreItemProvider = 4
}

export class TreeService {
    private itemProviderType: { [key in ItemProviderType]: CubeItemProvider | DimensionItemProvider | ProcessItemProvider | ChoreItemProvider };

    constructor(tm1Service: TM1Service) {
        this.itemProviderType = {
            [ItemProviderType.CubeItemProvider]: new CubeItemProvider(tm1Service),
            [ItemProviderType.DimensionItemProvider]: new DimensionItemProvider(tm1Service),
            [ItemProviderType.ProcessItemProvider]: new ProcessItemProvider(tm1Service),
            [ItemProviderType.ChoreItemProvider]: new ChoreItemProvider(tm1Service)
        };

        this.loadAllTree();
    }

    private loadAllTree() {
        commands.registerCommand('tm1-extension.loadTree', async () => {
            this.loadTree('package-cubes', ItemProviderType.CubeItemProvider);
            this.loadTree('package-dimensions', ItemProviderType.DimensionItemProvider);
            this.loadTree('package-processes', ItemProviderType.ProcessItemProvider);
            this.loadTree('package-chores', ItemProviderType.ChoreItemProvider);
        });
    }

    loadTree(viewId: string, object: ItemProviderType): TreeView<any> {
        const provider = this.itemProviderType[object] as TreeDataProvider<any>;
        return window.createTreeView(viewId, { treeDataProvider: provider });
    }
}