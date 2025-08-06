import { exec } from "child_process";
import path from 'path';
import * as vscode from 'vscode';
import { logToChannel } from "./logChannel";
export * from './logChannel';

const SFC_BUILDER = 'sfc-builder'

export function getConfiguration() {
  const config = vscode.workspace.getConfiguration(SFC_BUILDER);
  let output_path = config.get<string>('output_path', './');
  const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!workspacePath) throw new Error('请打开一个工作区');
  const id_pre = config.get<string>('id_pre');
  const id_type = config.get<string>('id_type');
  if (!path.isAbsolute(output_path)) output_path = path.join(workspacePath, output_path);


  // console.log('output_path', output_path)
  // console.log('id_pre', id_pre)
  // console.log('id_type', id_type)

  return { output_path, id_pre, id_type };
}

export function formatStdout(stdout: string) {
  return stdout.replace(/\n/g, '').replace(/\r/g, '');
}
export function alertTip(type: 'success' | 'error', title: string, msg: string) {
  const alertFn = type === 'success' ? vscode.window.showInformationMessage : vscode.window.showErrorMessage
  logToChannel(msg)
  alertFn(title, '查看详情').then(action => {
    if (action === '查看详情') {
      vscode.window.showInformationMessage(msg)
    }
  })
}

export function exec_cmd(cmd: string, successTip: string, errorTip: string) {
  const cp = exec(
    cmd,
    (err, stdout, stderr) => {
      let _err = err || stderr, _errMsg = _err.toString()
      if (_err) {
        alertTip('error', errorTip, _errMsg)
      } else {
        alertTip('success', successTip, stdout)
      }
    }
  )


}