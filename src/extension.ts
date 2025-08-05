
import * as vscode from 'vscode';
import { setupBuildCommand } from './commands/build';





export function activate(context: vscode.ExtensionContext) {



	setupBuildCommand(context)
	const disposable = vscode.commands.registerCommand('helloworld-vsce.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from helloworld-vsce!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.workspace
	console.log('插件失效');
}

