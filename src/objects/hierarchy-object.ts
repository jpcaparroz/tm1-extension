import path from "path";
import { Hierarchy } from "tm1js";
import { TreeItem, TreeItemCollapsibleState } from "vscode";

export class HierarchyItem extends TreeItem {
    constructor(
        public readonly hierarchy: Hierarchy,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly control?: boolean
    ) {
        super(hierarchy.name, collapsibleState);
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
