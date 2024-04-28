import * as vscode from 'vscode';
import * as path from 'path';
import { TM1Service, Process } from 'tm1js';

export class ProcessItemProvider implements vscode.TreeDataProvider<ProcessItem> {
	private tm1Service: TM1Service;
	private control?: boolean;

	constructor(tm1Service: TM1Service, control?: boolean) {
		this.tm1Service = tm1Service;
		this.control = control;
	}

	getTreeItem(element: ProcessItem): vscode.TreeItem {
		return element;
	}

	async getChildren(): Promise<ProcessItem[]> {
		try {
			return await this.loadProcessItems();
		} catch (error) {
			vscode.window.showErrorMessage(`Error getting processes: ${error}`);
			return [];
		}
	}

	private async loadProcessItems(): Promise<ProcessItem[]> {
		let processes: Process[] = [];
		if (this.control) {
			processes = await this.tm1Service.processes.getControlProcess();
		} else {
			processes = await this.tm1Service.processes.getModelProcess();
		}
		return processes.map(process => new ProcessItem(process, vscode.TreeItemCollapsibleState.Collapsed, this.control));
	}
}


export class ProcessItem extends vscode.TreeItem {
	constructor(
		public readonly process: Process,
		public readonly collapsibleState = vscode.TreeItemCollapsibleState.None,
		public readonly control?: boolean
	) {
		super(process.name, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'light', 'process.svg'),
		dark: path.join(__filename, '..', '..', '..', 'src', 'resources', 'images', 'dark', 'process.svg')
	};
}
