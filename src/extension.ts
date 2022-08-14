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
  let disposable = vscode.commands.registerCommand("html-ts.gotoTs", () => {
    // The code you place here will be executed every time your command is executed
    // if(vscode.window.activeTextEditor && sufficientEditorsOpen())
    // {
    //   // vscode.commands.executeCommand("workbench.action.splitEditor");
    //   goTo(vscode.window.activeTextEditor.document.fileName);
    //   vscode.commands.executeCommand("workbench.action.moveEditorToPreviouseGroup");
    // }else{
    //   vscode.window.showInformationMessage("Please make sure you have at least 2 editors open");
    //   vscode.window.showInformationMessage("Please make sure you have an html file open");
    // }
    switch(vscode.window.activeTextEditor?.viewColumn)
    {
      case 1:
        goTo(vscode.window.activeTextEditor.document.fileName);
        vscode.commands.executeCommand("workbench.action.moveEditorToNextGroup");
        break;
      case 2:
        vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup");
        goTo(vscode.window.activeTextEditor.document.fileName);
        break;
      default:
        if(vscode.window.activeTextEditor)
          {goTo(vscode.window.activeTextEditor.document.fileName);}
        break;
    }
    // workbench.action.splitEditor
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
