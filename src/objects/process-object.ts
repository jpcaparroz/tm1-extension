import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Process } from 'tm1js';

export class ProcessItemProvider implements vscode.TreeDataProvider<ProcessItem> {
	private tm1Service: TM1Service

	constructor(tm1Service: TM1Service) {
		this.tm1Service = tm1Service
	}

	getTreeItem(element: ProcessItem): vscode.TreeItem {
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
			vscode.window.showErrorMessage(`Error getting processes: ${error}`);
			return [];
		}

	}
}

export class ProcessItem extends vscode.TreeItem {
	constructor(
		public readonly process: Process,
		public readonly collapsibleState = vscode.TreeItemCollapsibleState.None
	) {
		super(process.name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'process.svg'),
		dark: path.join(__filename, '..', '..', '..', 'src','resources', 'images', 'dark', 'process.svg')
	};
}
