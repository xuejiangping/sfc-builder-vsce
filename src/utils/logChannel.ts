import * as vscode from 'vscode';



const log_channel = vscode.window.createOutputChannel("sfc-builder-vsce-log");

/**************************************************
*
*          logToChannel
*  记录日志到 输出 channel
*
 **************************************************/


export function logToChannel(message: string) {
  log_channel.appendLine(message);
}