import path from 'path';
import * as vscode from 'vscode';
export * from './logChannel';


const BUILD_SFC = 'build_sfc'
const config = vscode.workspace.getConfiguration(BUILD_SFC);

export function getOptions() {

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

