
import { exec } from 'child_process';
import path from 'path';
import * as vscode from 'vscode';
import { getOptions } from '../utils';

function build(filePath: string, extensionPath: string) {
  const { output_path, id_pre, id_type } = getOptions();
  const buildScriptPath = path.join(extensionPath, 'src', 'lib', 'build-sfc.min.cjs');
  vscode.window.showInformationMessage(`开始编译 ${filePath}`);


  const cp = exec(
    `node ${buildScriptPath} -t ${id_type}  --outputPath ${output_path} --idPre ${id_pre} ${filePath}`,
    (err, stdout, stderr) => {
      let _err = err || stderr;
      if (_err) {
        vscode.window.showErrorMessage(`编译失败 ${filePath}`);
        console.error(_err)
      } else {
        vscode.window.showInformationMessage(`编译成功 ${filePath}`);
        console.log(stdout)
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

  context.subscriptions.push(disposable);
}