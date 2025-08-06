
import { rm } from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { alertTip, getConfiguration, logToChannel } from '../utils';

function clear(extensionPath: string) {
  const { output_path } = getConfiguration();
  const buildScriptPath = path.join(extensionPath, 'src', 'lib', 'sfc-builder-cli.min.cjs');
  logToChannel(`开始清理 ${output_path}`);

  rm(output_path, { recursive: true, force: true }, (err) => {
    if (err) alertTip('error', 'clear 出错', err.message)
    else alertTip('success', 'clear 成功', 'clear 成功')
  })
  // exec_cmd(
  //   `node ${buildScriptPath} clear --outputPath ${output_path}`,
  //   `clear 完成 ${output_path}`,
  //   `clear 失败 ${output_path}`
  // )


}






export function setupClearCommand(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('sfc-builder.clear', () => {
    const extensionPath = context.extensionPath;
    clear(extensionPath)
  });
  context.subscriptions.push(disposable)
}