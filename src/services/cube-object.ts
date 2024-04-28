import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service } from 'tm1js';

export class CubeItemProvider implements vscode.TreeDataProvider<CubeItem> {
	private cubes: string[];

	constructor() {
	}

	// refresh(): void {
	// 	this._onDidChangeTreeData.fire();
	// }

	getTreeItem(element: CubeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: CubeItem): Thenable<CubeItem[]> {
		if (element) {
			return Promise.resolve([]);
		} else {
			return Promise.resolve([]);
		} 
	}

	async getCubes(tm1Service: TM1Service): Promise<CubeItem[]> {
		try {
			const cubeNames = await tm1Service.cubes.getAllControlNames();
	
			const cubes: CubeItem[] = cubeNames.map(cubeName => {
				return new CubeItem(
					cubeName,
					vscode.TreeItemCollapsibleState.None
				);
			});
	
			return cubes;
		} catch (error) {
			console.error('Error getting cubes:', error);
			return [];
		}
		
	} 
}

export class CubeItem extends vscode.TreeItem {
	constructor(
		public readonly name: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		private readonly type = 'cube',
		public readonly command?: vscode.Command
	) {
		super(name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'images', 'light', 'cube.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'images', 'dark', 'cube.svg')
	};

	contextValue = 'dependency';
}
