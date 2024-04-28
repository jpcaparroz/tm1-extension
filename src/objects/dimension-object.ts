import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Dimension } from 'tm1js';

export class DimensionItemProvider implements vscode.TreeDataProvider<DimensionItem> {
	private tm1Service: TM1Service;
	private control?: boolean;

	constructor(tm1Service: TM1Service, control?: boolean) {
		this.tm1Service = tm1Service;
		this.control = control;
	}

	getTreeItem(element: DimensionItem): vscode.TreeItem {
		return element;
	}

	async getChildren(): Promise<DimensionItem[]> {
		try {
			return await this.loadDimensionItems();
		} catch (error) {
			vscode.window.showErrorMessage(`Error getting dimensions: ${error}`);
			return [];
		}
	}

	private async loadDimensionItems(): Promise<DimensionItem[]> {
		let dimensions: Dimension[] = [];
		if (this.control) {
			dimensions = await this.tm1Service.dimensions.getControlDimensions();
		} else {
			dimensions = await this.tm1Service.dimensions.getModelDimensions();
		}
		return dimensions.map(dimension => new DimensionItem(dimension, vscode.TreeItemCollapsibleState.Collapsed, this.control));
	}
}


export class DimensionItem extends vscode.TreeItem {
	constructor(
		public readonly dimension: Dimension,
		public readonly collapsibleState = vscode.TreeItemCollapsibleState.None,
		public readonly control?: boolean
	) {
		super(dimension.name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'dimension.svg'),
		dark: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'dark', 'dimension.svg')
	};
}
