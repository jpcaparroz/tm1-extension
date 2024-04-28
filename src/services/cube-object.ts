import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Cube } from 'tm1js';

export class CubeItem extends vscode.TreeItem {
	constructor(
		public readonly cube: Cube,
		public readonly collapsibleState = vscode.TreeItemCollapsibleState.None
	) {
		super(cube.name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', 'resources', 'images', 'light', 'cube.svg'),
		dark: path.join(__filename, '..', 'resources', 'images', 'dark', 'cube.svg')
	};
}

export class CubeItemProvider implements vscode.TreeDataProvider<CubeItem> {
    private tm1Service: TM1Service

    constructor(tm1Service: TM1Service) {
        this.tm1Service = tm1Service
    }

    getTreeItem(element: CubeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: CubeItem): vscode.ProviderResult<CubeItem[]> {
		const Cubes = this.tm1Service.cubes.getAll()
		console.log(Cubes);
		
		return 
        // return Promise.resolve([]);
    }
    // getChildren(element?: CubeItem): Thenable<CubeItem[]> {
    //     console.log(element);
    //     if (element) {
    //         return Promise.resolve([]);
    //     } else {
    //         return Promise.resolve([]);
    //     } 
    // }

    async getCubes(): Promise<CubeItem[]> {
        try {
            const cubes = await this.tm1Service.cubes.getAll();

            const cubesItem: CubeItem[] = cubes.map(cube => {
                return new CubeItem(
                    cube
                );
            });
            console.log(cubesItem);
            
            return cubesItem;

        } catch (error) {
            console.error('Error getting cubes:', error);
            return [];
        }
        
    } 
}
