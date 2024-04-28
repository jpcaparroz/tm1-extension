import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from 'vscode';
import { join } from 'path';
import { TM1Service, Process } from 'tm1js';

export class ProcessItemProvider implements TreeDataProvider<ProcessItem> {
	private tm1Service: TM1Service

	constructor(tm1Service: TM1Service) {
		this.tm1Service = tm1Service
	}

	getTreeItem(element: ProcessItem): TreeItem {
		return element;
	}

	getChildren(): Thenable<ProcessItem[]> {
		return Promise.resolve(this.getProcesses());
	}

	private async getProcesses(): Promise<ProcessItem[]> {
		try {
			const processes = await this.tm1Service.processes.getAll();
			
			const processesItem: ProcessItem[] = processes.map(process => {
				return new ProcessItem(
					process
				);
			});

			return processesItem;

		} catch (error) {
			window.showErrorMessage(`Error getting processes: ${error}`);
			return [];
		}

	}
}

export class ProcessItem extends TreeItem {
	constructor(
		public readonly process: Process,
		public readonly collapsibleState = TreeItemCollapsibleState.None
	) {
		super(process.name, collapsibleState);
	}

	iconPath = {
		light: join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'process.svg'),
		dark: join(__filename, '..', '..', '..', 'src','resources', 'images', 'dark', 'process.svg')
	};
}
