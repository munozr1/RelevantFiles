// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { createEditor, goTo, HtmlTs, isOpen, moveLeft, moveRight, openLeft, openRight, sufficientEditorsOpen } from "./libs/functions";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // vscode.window.showInformationMessage("Hello World!");


  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("relevant-files.htmlts", () => {
    let htmlFile: string;
    if(sufficientEditorsOpen()){
      switch(vscode.window.activeTextEditor?.viewColumn?.valueOf())
      {
        // if the active editor is the first editor
        case 1:
          // vscode.window.showInformationMessage("active editor is the first editor");
          htmlFile = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(htmlFile))
            {moveRight(htmlFile);}
          else
            {openRight(htmlFile);}
          break;
        // if the active editor is the second editor
        case 2:
          // vscode.window.showInformationMessage("active editor is the second editor");
          htmlFile = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(htmlFile))
            {moveLeft(htmlFile);}
          else
            {openLeft(htmlFile);}
          break;
        default:
          // vscode.window.showInformationMessage("active editor is neither the first nor the second editor");
          if(vscode.window.activeTextEditor)
          {
            htmlFile = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
            goTo(vscode.window.activeTextEditor.document.fileName);
          }
          break;
      }
    }
    // if there is only one editor open, split the window
    // and open the file in the newly created second editor
    else if(vscode.window.activeTextEditor){
      vscode.window.showInformationMessage("not enough editors, opening another editor");
      htmlFile = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
      createEditor(htmlFile)
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

