// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { goTo, sufficientEditorsOpen } from "./libs/functions";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // vscode.window.showInformationMessage("Hello World!");


  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("relevant-files.goto", () => {
    let htmlFile: string;
    vscode.window.showInformationMessage("editor number: " + vscode.window.activeTextEditor?.document.valueOf());
    if(sufficientEditorsOpen()){
      switch(vscode.window.activeTextEditor?.viewColumn?.toString())
      {
        case '1':
          htmlFile = vscode.window.activeTextEditor?.document.fileName;
          // vscode.window.showInformationMessage("one editor open");
          vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup");
          goTo(htmlFile);
          break;
          case '2':
          htmlFile = vscode.window.activeTextEditor?.document.fileName;
          // vscode.window.showInformationMessage("two editors open");
          vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup");
          goTo(htmlFile);
          break;
        default:
          if(vscode.window.activeTextEditor)
            {goTo(vscode.window.activeTextEditor.document.fileName);}
          break;
      }
    }else if(vscode.window.activeTextEditor){
      // vscode.window.showInformationMessage("not enough editors, opening another editor");
      vscode.commands.executeCommand("workbench.action.splitEditorRight");
      vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup");
      goTo(vscode.window.activeTextEditor.document.fileName);
    }
//     // workbench.action.splitEditor
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

