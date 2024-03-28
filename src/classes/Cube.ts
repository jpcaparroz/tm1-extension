import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// export class Cube implements vscode.TreeDataProvider<Dependency> {
//   constructor(private workspaceRoot: string) {}

//   getTreeItem(element: Dependency): vscode.TreeItem {
//     return element;
//   }

//   /**
//    * Given the path to package.json, read all its dependencies and devDependencies.
//    */
//   private getDepsInPackageJson(packageJsonPath: string): Dependency[] {
//     if (this.pathExists(packageJsonPath)) {
//       const toDep = (moduleName: string, version: string): Dependency => {
//         if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
//           return new Dependency(
//             moduleName,
//             version,
//             vscode.TreeItemCollapsibleState.Collapsed
//           );
//         } else {
//           return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None);
//         }
//       };

//       const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

//       const deps = packageJson.dependencies
//         ? Object.keys(packageJson.dependencies).map(dep =>
//             toDep(dep, packageJson.dependencies[dep])
//           )
//         : [];
//       const devDeps = packageJson.devDependencies
//         ? Object.keys(packageJson.devDependencies).map(dep =>
//             toDep(dep, packageJson.devDependencies[dep])
//           )
//         : [];
//       return deps.concat(devDeps);
//     } else {
//       return [];
//     }
//   }

//   private pathExists(p: string): boolean {
//     try {
//       fs.accessSync(p);
//     } catch (err) {
//       return false;
//     }
//     return true;
//   }
// }

// class Dependency extends vscode.TreeItem {
//   constructor(
//     public readonly label: string,
//     private version: string,
//     public readonly collapsibleState: vscode.TreeItemCollapsibleState
//   ) {
//     super(label, collapsibleState);
//     this.tooltip = `${this.label}-${this.version}`;
//     this.description = this.version;
//   }

// }