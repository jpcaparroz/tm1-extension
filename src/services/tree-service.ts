import { TreeDataProvider, TreeView, commands, window } from "vscode";
import { TM1Service } from "tm1js";
import { ChoreItemProvider } from "../objects/chore-object";
import { CubeItemProvider } from "../objects/cube-object";
import { DimensionItemProvider } from "../objects/dimension-object";
import { ProcessItemProvider } from "../objects/process-object";

export enum ItemProviderType {
    CubeItemProvider = 1,
    ControlCubeItemProvider = 2,
    DimensionItemProvider = 3,
    ControlDimensionItemProvider = 4,
    ProcessItemProvider = 5,
    ControlProcessItemProvider = 6,
    ChoreItemProvider = 7,
}

export class TreeService {
    private itemProviderType: {
        [key in ItemProviderType]:
            | CubeItemProvider
            | DimensionItemProvider
            | ProcessItemProvider
            | ChoreItemProvider;
    };

    constructor(tm1Service: TM1Service) {
        this.itemProviderType = {
            [ItemProviderType.CubeItemProvider]: new CubeItemProvider(
                tm1Service
            ),
            [ItemProviderType.ControlCubeItemProvider]: new CubeItemProvider(
                tm1Service,
                true
            ),
            [ItemProviderType.DimensionItemProvider]: new DimensionItemProvider(
                tm1Service
            ),
            [ItemProviderType.ControlDimensionItemProvider]:
                new DimensionItemProvider(tm1Service, true),
            [ItemProviderType.ProcessItemProvider]: new ProcessItemProvider(
                tm1Service
            ),
            [ItemProviderType.ControlProcessItemProvider]:
                new ProcessItemProvider(tm1Service, true),
            [ItemProviderType.ChoreItemProvider]: new ChoreItemProvider(
                tm1Service
            ),
        };
        this.loadAllTreeCommand();
    }

    private loadTree(viewId: string, object: ItemProviderType): TreeView<any> {
        const provider = this.itemProviderType[object] as TreeDataProvider<any>;
        return window.createTreeView(viewId, { treeDataProvider: provider });
    }

    private loadAllTreeCommand() {
        commands.registerCommand("tm1-extension.loadTree", async () => {
            this.loadTree("package-cubes", ItemProviderType.CubeItemProvider);
            this.loadTree(
                "package-control-cubes",
                ItemProviderType.ControlCubeItemProvider
            );
            this.loadTree(
                "package-dimensions",
                ItemProviderType.DimensionItemProvider
            );
            this.loadTree(
                "package-control-dimensions",
                ItemProviderType.ControlDimensionItemProvider
            );
            this.loadTree(
                "package-processes",
                ItemProviderType.ProcessItemProvider
            );
            this.loadTree(
                "package-control-processes",
                ItemProviderType.ControlProcessItemProvider
            );
            this.loadTree("package-chores", ItemProviderType.ChoreItemProvider);
        });
    }

    public async loadAllTree() {
        await commands.executeCommand("tm1-extension.loadTree");
    }
}
