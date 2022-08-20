// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { changeFileName, createEditor, goTo, htmlTs, isOpen, moveLeft, moveRight, openFile, openLeft, openRight, sufficientEditorsOpen } from "./libs/functions";

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
          htmlFile = htmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(htmlFile))
            {moveRight(htmlFile);}
          else
            {openRight(htmlFile);}
          break;
        // if the active editor is the second editor
        case 2:
          // vscode.window.showInformationMessage("active editor is the second editor");
          htmlFile = htmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(htmlFile))
            {moveLeft(htmlFile);}
          else
            {openLeft(htmlFile);}
          break;
        default:
          // vscode.window.showInformationMessage("active editor is neither the first nor the second editor");
          if(vscode.window.activeTextEditor)
          {
            htmlFile = htmlTs(vscode.window.activeTextEditor?.document.fileName);
            goTo(vscode.window.activeTextEditor.document.fileName);
          }
          break;
      }
    }
    // if there is only one editor open, split the window
    // and open the file in the newly created second editor
    else if(vscode.window.activeTextEditor){
      // vscode.window.showInformationMessage("not enough editors, opening another editor");
      htmlFile = htmlTs(vscode.window.activeTextEditor?.document.fileName);
      createEditor(htmlFile);
    }
  });

  let relevantHTML = vscode.commands.registerCommand("relevant-files.relevnatHTML", () => {
    let htmlFile = changeFileName(vscode.window.activeTextEditor?.document.fileName, "html");
    if(htmlFile)
      {openFile(htmlFile);}
  });

  let relevantTS = vscode.commands.registerCommand("relevant-files.relevantTS", () => {
    let tsFile = changeFileName(vscode.window.activeTextEditor?.document.fileName, "ts");
    if(tsFile)
      {openFile(tsFile);}
  } );

  let relevantCSS = vscode.commands.registerCommand("relevant-files.relevantCSS", () => {
    let cssFile = changeFileName(vscode.window.activeTextEditor?.document.fileName, "css");
    if(cssFile)
      {openFile(cssFile);}
  } );

  let relevantSCSS = vscode.commands.registerCommand("relevant-files.relevantSCSS", () => {
    let scssFile = changeFileName(vscode.window.activeTextEditor?.document.fileName, "scss");
    if(scssFile)
      {openFile(scssFile);}
  } );

  context.subscriptions.push(disposable, relevantHTML, relevantTS, relevantCSS, relevantSCSS);
}

// this method is called when your extension is deactivated
export function deactivate() {}

