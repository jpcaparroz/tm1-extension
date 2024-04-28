import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from 'vscode';
import { join } from 'path';
import { TM1Service, Dimension } from 'tm1js';

export class DimensionItemProvider implements TreeDataProvider<DimensionItem> {
	private tm1Service: TM1Service

	constructor(tm1Service: TM1Service) {
		this.tm1Service = tm1Service
	}

	getTreeItem(element: DimensionItem): TreeItem {
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
			window.showErrorMessage(`Error getting dimensions: ${error}`);
			return [];
		}

	}
}

export class DimensionItem extends TreeItem {
	constructor(
		public readonly dimension: Dimension,
		public readonly collapsibleState = TreeItemCollapsibleState.None
	) {
		super(dimension.name, collapsibleState);
	}

	iconPath = {
		light: join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'dimension.svg'),
		dark: join(__filename, '..', '..', '..', 'src','resources', 'images', 'dark', 'dimension.svg')
	};
}
