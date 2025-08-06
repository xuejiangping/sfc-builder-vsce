
import * as vscode from 'vscode';
import { setupBuildCommand } from './commands/build';
import { setupClearCommand } from './commands/clear';





export function activate(context: vscode.ExtensionContext) {
	setupBuildCommand(context);
	setupClearCommand(context);
}

export function deactivate() {
	// 例如：如果你有全局定时器或全局事件监听器，需要在这里 clear

	console.log('插件失效');
}

