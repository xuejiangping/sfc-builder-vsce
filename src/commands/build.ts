import path from 'path';
import * as vscode from 'vscode';
import { exec_cmd, getConfiguration, logToChannel } from '../utils';

let fileWatcher: vscode.Disposable | null = null;

function build(filePath: string, extensionPath: string) {
  const { output_path, id_pre, id_type } = getConfiguration();
  const buildScriptPath = path.join(extensionPath, 'src', 'lib', 'sfc-builder-cli.min.cjs');
  logToChannel(`开始编译 ${filePath}`);
  exec_cmd(
    `node ${buildScriptPath} build -t ${id_type}  --outputPath ${output_path} --idPre ${id_pre} ${filePath}`,
    `编译完成 ${filePath}`,
    `编译失败 ${filePath}`
  )
}

export function setupBuildCommand(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand('sfc-builder.build', () => {

    const extensionPath = context.extensionPath;

    // 如果已经存在监听器
    if (fileWatcher) {
      vscode.window.showInformationMessage('sfc-builder: 文件监听已启动,保存Vue文件时将自动构建');
      return;
    }

    // 创建文件监听器
    fileWatcher = vscode.workspace.onDidSaveTextDocument(doc => {
      if (doc.languageId === 'vue') {
        build(doc.fileName, extensionPath);
      }
    });

    context.subscriptions.push(fileWatcher);
    logToChannel('开始监听Vue文件保存事件');
    vscode.window.showInformationMessage('sfc-builder: 开始监听Vue文件保存事件,保存Vue文件时将自动构建');
  });
  context.subscriptions.push(disposable);
}