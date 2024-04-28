import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Cube } from 'tm1js';

export class CubeItemProvider implements vscode.TreeDataProvider<CubeItem> {
	private tm1Service: TM1Service

	constructor(tm1Service: TM1Service) {
		this.tm1Service = tm1Service
	}

	getTreeItem(element: CubeItem): vscode.TreeItem {
		return element;
	}

	getChildren(): Thenable<CubeItem[]> {
		return Promise.resolve(this.getCubes());
	}

	private async getCubes(): Promise<CubeItem[]> {
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
			vscode.window.showErrorMessage(`Error getting cubes: ${error}`);
			return [];
		}

	}
}

export class CubeItem extends vscode.TreeItem {
	constructor(
		public readonly cube: Cube,
		public readonly collapsibleState = vscode.TreeItemCollapsibleState.None
	) {
		super(cube.name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'cube.svg'),
		dark: path.join(__filename, '..', '..', '..', 'src','resources', 'images', 'dark', 'cube.svg')
	};
}
