
import { exec } from 'child_process';
import path from 'path';
import * as vscode from 'vscode';
import { getOptions, logToChannel } from '../utils';

function build(filePath: string, extensionPath: string) {
  const { output_path, id_pre, id_type } = getOptions();
  const buildScriptPath = path.join(extensionPath, 'src', 'lib', 'build-sfc.min.cjs');
  vscode.window.showInformationMessage(`开始编译 ${filePath}`);


  const cp = exec(
    `node ${buildScriptPath} -t ${id_type}  --outputPath ${output_path} --idPre ${id_pre} ${filePath}`,
    (err, stdout, stderr) => {
      let _err = err || stderr, _errMsg = _err.toString()

      if (_err) {
        console.error(_err)
        logToChannel(_errMsg)
        vscode.window.showErrorMessage(`编译失败 ${filePath}`, { detail: _errMsg }, '查看详情').then(action => {
          if (action === '查看详情') {
            vscode.window.showInformationMessage(_errMsg)
          }
        })
      } else {
        console.log(stdout)
        logToChannel(stdout)
        vscode.window.showInformationMessage(`编译完成 ${filePath}`, '查看详情').then(action => {
          if (action === '查看详情') {
            vscode.window.showInformationMessage(stdout)

          }
        })
      }
    }
  )


}






export function setupBuildCommand(context: vscode.ExtensionContext) {
  const extensionPath = context.extensionPath;
  const disposable = vscode.workspace.onDidSaveTextDocument(doc => {
    if (doc.languageId === 'vue') {
      console.log(doc.fileName, doc.languageId)
      build(doc.fileName, extensionPath)
    }

  })
  vscode.commands.registerCommand('sfc-builder.start', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const doc = editor.document;
      if (doc.languageId === 'vue') {
        build(doc.fileName, extensionPath)
      }
    }
  });

  context.subscriptions.push(disposable);
}