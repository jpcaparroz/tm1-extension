import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Cube } from 'tm1js';

export class CubeItemProvider implements vscode.TreeDataProvider<CubeItem> {
	private tm1Service: TM1Service;
	private control?: boolean;

	constructor(tm1Service: TM1Service, control?: boolean) {
		this.tm1Service = tm1Service;
		this.control = control;
	}

	getTreeItem(element: CubeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(): Promise<CubeItem[]> {
		try {
			return await this.loadCubeItems();
		} catch (error) {
			vscode.window.showErrorMessage(`Error getting cubes: ${error}`);
			return [];
		}
	}

	private async loadCubeItems(): Promise<CubeItem[]> {
		let cubes: Cube[] = [];

		if (this.control) {
			cubes = await this.tm1Service.cubes.getControlCubes();
		} else {
			cubes = await this.tm1Service.cubes.getModelCubes();
		}

		return cubes.map(cube => new CubeItem(cube, vscode.TreeItemCollapsibleState.None, this.control));
	}
}

export class CubeItem extends vscode.TreeItem {
	constructor(
		public readonly cube: Cube,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly control?: boolean
	) {
		super(cube.name, collapsibleState);
	};

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'cube.svg'),
		dark: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'dark', 'cube.svg')
	};

	command = {
		command: 'tm1-extension.cubeItemClick',
		title: 'Open Cube',
		arguments: [this]
	};

	getContent(): Cube {
		return this.cube;
	}
}