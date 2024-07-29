import * as path from "path";
import { TM1Service, Cube, Dimension } from "tm1js";
import { TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";
import { DimensionItem } from "./dimension-object";
import { HierarchyItem } from "./hierarchy-object";

export class CubeItemProvider
    implements TreeDataProvider<CubeItem | DimensionItem | HierarchyItem>
{
    private tm1Service: TM1Service;
    private control?: boolean;

    constructor(tm1Service: TM1Service, control?: boolean) {
        this.tm1Service = tm1Service;
        this.control = control;
    }

    // #TODO make new get dimension service
    // private async loadDimensionItems(
    //     cubeName: string
    // ): Promise<DimensionItem[]> {
    //     const dimensions = await this.tm1Service.cubes.getDimensions(cubeName);
    //     console.log(dimensions);
    //     return dimensions.map(
    //         (dimension) =>
    //             new DimensionItem(
    //                 dimension,
    //                 TreeItemCollapsibleState.Collapsed,
    //                 this.control
    //             )
    //     );
    // }

    private async loadCubeItems(): Promise<CubeItem[]> {
        let cubes: Cube[] = [];
        if (this.control) {
            cubes = await this.tm1Service.cubes.getControlCubes();
        } else {
            cubes = await this.tm1Service.cubes.getModelCubes();
        }
        return cubes.map(
            (cube) =>
                new CubeItem(
                    cube,
                    TreeItemCollapsibleState.Collapsed,
                    this.control
                )
        );
    }
    private async loadDimensionItems(
        dimensionNames: string[]
    ): Promise<DimensionItem[]> {
        // const teste = await this.tm1Service.cubes.getDimensions('Base Sales Forecast')
        // console.log(teste);
        const dimensionItems = await Promise.all(
            dimensionNames.map(async (dimensionName) => {
                const dimension = await this.tm1Service.dimensions.get(
                    dimensionName
                );
                return new DimensionItem(
                    dimension,
                    TreeItemCollapsibleState.Collapsed
                );
            })
        );
        console.log(dimensionItems);
        return dimensionItems;
    }
    private async loadHierarchyItems(
        dimension: Dimension
    ): Promise<HierarchyItem[]> {
        if (dimension.hierarchies) {
            const hierarchyItems = dimension.hierarchies;
            const hierarchy = hierarchyItems.map((hierarchy) => {
                return new HierarchyItem(
                    hierarchy,
                    TreeItemCollapsibleState.None
                );
            });
            return hierarchy;
        }
        return [];
    }

    async getTreeItem(
        element: CubeItem | DimensionItem | HierarchyItem
    ): Promise<TreeItem> {
        return element;
    }

    async getChildren(
        element?: TreeItem
    ): Promise<(CubeItem | DimensionItem | HierarchyItem)[]> {
        if (!element) {
            return this.loadCubeItems();
        } else if (element instanceof CubeItem) {
            return this.loadDimensionItems(element.cube.dimensions);
            // return this.loadDimensionItems(element.cube.name);
        } else if (element instanceof DimensionItem) {
            return this.loadHierarchyItems(element.dimension);
        }
        return [];
    }
}

export class CubeItem extends TreeItem {
    constructor(
        public readonly cube: Cube,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly control?: boolean
    ) {
        super(cube.name, collapsibleState);
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
                "cube.svg"
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
                "cube.svg"
            ),
        };
    }
}
