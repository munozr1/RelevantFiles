
import * as vscode from "vscode";


/**
 * Most useful for angular projects.
 * This function will alternate between relevant html and ts files.
 * 
 * @param file : the file name to convert
 * @returns 
 */
export function HtmlTs(file: string): string
{
  let newFile: string = '';
  if(file.endsWith(".html"))
    {newFile = file.replace(".html", ".ts");}
  else if(file.endsWith(".ts"))
    {newFile = file.replace(".ts", ".html");}
  
  return newFile;
}

/**
 * 
 * @param file : the file to open
 */
export function goTo(file: string ) {
  vscode.workspace.openTextDocument(file).then(doc => {
    vscode.window.showTextDocument(doc);
  });
}

/**
 * 
 * @returns true if there are two or more editors open
 */
export function sufficientEditorsOpen(){
  let sufficientEditors: boolean = false;
  vscode.window.showInformationMessage("checking for sufficient editors: " + vscode.window.visibleTextEditors.length);
  if(vscode.window.visibleTextEditors.length >= 2){
    sufficientEditors = true;
  }
  return sufficientEditors;
}



/**
 * Opens a file in the first editor.
 * @param file : the file to open
 */
export function openLeft(file: string){
  vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup");
  goTo(file);
}

/**
 * Opens a file in the second editor.
 * @param file : the file to open
 */
export function openRight(file: string){
  vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup");
  goTo(file);
}

export function createEditor(file: string){
  vscode.commands.executeCommand("workbench.action.splitEditorRight");
  vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup");
  goTo(file);
}

export function isOpen(fileToOpen: string){
  let open: boolean = false;
  vscode.workspace.textDocuments.forEach(openFile => {
    if(openFile.fileName === fileToOpen){
      open = true;
    }
  });
  return open;
}

export function moveLeft(file: string){
  goTo(file);
  vscode.commands.executeCommand("workbench.action.moveEditorToPreviousGroup");
}
export function moveRight(file: string){
  goTo(file);
  vscode.commands.executeCommand("workbench.action.moveEditorToNextGroup");
}
