import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from 'vscode';
import { join } from 'path';
import { TM1Service, Chore } from 'tm1js';

export class ChoreItemProvider implements TreeDataProvider<ChoreItem> {
	private tm1Service: TM1Service

	constructor(tm1Service: TM1Service) {
		this.tm1Service = tm1Service
	}

	getTreeItem(element: ChoreItem): TreeItem {
		return element;
	}

	getChildren(): Thenable<ChoreItem[]> {
		return Promise.resolve(this.getChores());
	}

	private async getChores(): Promise<ChoreItem[]> {
		try {
			const chores = await this.tm1Service.chores.getAll();
			
			const choresItems: ChoreItem[] = chores.map(chore => {
				return new ChoreItem(
					chore
				);
			});

			return choresItems;

		} catch (error) {
			window.showErrorMessage(`Error getting chores: ${error}`);
			return [];
		}

	}
}

export class ChoreItem extends TreeItem {
	constructor(
		public readonly chore: Chore,
		public readonly collapsibleState = TreeItemCollapsibleState.None
	) {
		super(chore.name, collapsibleState);
	}

	iconPath = {
		light: join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'chore.svg'),
		dark: join(__filename, '..', '..', '..', 'src','resources', 'images', 'dark', 'chore.svg')
	};
}
