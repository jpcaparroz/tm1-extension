import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Dimension } from 'tm1js';

export class DimensionItemProvider implements vscode.TreeDataProvider<DimensionItem> {
	private tm1Service: TM1Service

	constructor(tm1Service: TM1Service) {
		this.tm1Service = tm1Service
	}

	getTreeItem(element: DimensionItem): vscode.TreeItem {
		return element;
	}

	getChildren(): Thenable<DimensionItem[]> {
		return Promise.resolve(this.getDimensions());
	}

	private async getDimensions(): Promise<DimensionItem[]> {
		try {
			const dimensions = await this.tm1Service.dimensions.getAll();
			
			const dimensionsItems: DimensionItem[] = dimensions.map(dimension => {
				return new DimensionItem(
					dimension
				);
			});

			return dimensionsItems;

		} catch (error) {
			vscode.window.showErrorMessage(`Error getting dimensions: ${error}`);
			return [];
		}

	}
}

export class DimensionItem extends vscode.TreeItem {
	constructor(
		public readonly dimension: Dimension,
		public readonly collapsibleState = vscode.TreeItemCollapsibleState.None
	) {
		super(dimension.name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'dimension.svg'),
		dark: path.join(__filename, '..', '..', '..', 'src','resources', 'images', 'dark', 'dimension.svg')
	};
}
