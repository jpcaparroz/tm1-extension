import {
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState,
    window,
} from "vscode";
import path, { join } from "path";
import { TM1Service, Dimension, Hierarchy } from "tm1js";

export class DimensionItemProvider implements TreeDataProvider<DimensionItem> {
    private tm1Service: TM1Service;
    private control?: boolean;

    constructor(tm1Service: TM1Service, control?: boolean) {
        this.tm1Service = tm1Service;
        this.control = control;
    }

    getTreeItem(element: DimensionItem): TreeItem {
        return element;
    }

    async getChildren(): Promise<DimensionItem[]> {
        try {
            return await this.loadDimensionItems();
        } catch (error) {
            window.showErrorMessage(`Error getting dimensions: ${error}`);
            return [];
        }
    }

    private async loadDimensionItems(): Promise<DimensionItem[]> {
        let dimensions: Dimension[] = [];
        if (this.control) {
            dimensions =
                await this.tm1Service.dimensions.getControlDimensions();
        } else {
            dimensions = await this.tm1Service.dimensions.getModelDimensions();
        }
        return dimensions.map(
            (dimension) =>
                new DimensionItem(
                    dimension,
                    TreeItemCollapsibleState.Collapsed,
                    this.control
                )
        );
    }
}

export class DimensionItem extends TreeItem {
    constructor(
        public readonly dimension: Dimension,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly control?: boolean
    ) {
        super(dimension.name, collapsibleState);
        this.iconPath = {
            light: path.join(
                __filename,
                "..",
                "..",
                "..",
                "src",
                "resources",
                "images",
                "light",
                "dimension.svg"
            ),
            dark: path.join(
                __filename,
                "..",
                "..",
                "..",
                "src",
                "resources",
                "images",
                "dark",
                "dimension.svg"
            ),
        };
    }
}

