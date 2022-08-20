
import * as vscode from "vscode";


/**
 * Most useful for angular projects.
 * This function will alternate between relevant html and ts files.
 * 
 * @param file : the file name to convert
 * @returns 
 */
export function htmlTs(file: string): string
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
  // vscode.window.showInformationMessage("checking for sufficient editors: " + vscode.window.visibleTextEditors.length);
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


export function openFile(file: string){
      if(sufficientEditorsOpen()){
      switch(vscode.window.activeTextEditor?.viewColumn?.valueOf())
      {
        // if the active editor is the first editor
        case 1:
          // vscode.window.showInformationMessage("active editor is the first editor");
          // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(file))
            {moveRight(file);}
          else
            {openRight(file);}
          break;
        // if the active editor is the second editor
        case 2:
          // vscode.window.showInformationMessage("active editor is the second editor");
          // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(file))
            {moveLeft(file);}
          else
            {openLeft(file);}
          break;
        default:
          // vscode.window.showInformationMessage("active editor is neither the first nor the second editor");
          if(vscode.window.activeTextEditor)
          {
            // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
            goTo(vscode.window.activeTextEditor.document.fileName);
          }
          break;
      }
    }
    // if there is only one editor open, split the window
    // and open the file in the newly created second editor
    else if(vscode.window.activeTextEditor){
      // vscode.window.showInformationMessage("not enough editors, opening another editor");
      // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
      createEditor(file);
    }
}

export function changeFileName(file: string| undefined, extension: string)
{
  if(file){
  let newFile: string = file.substring(0, file.lastIndexOf(".") + 1);
  return newFile.concat(extension); 
  }
  vscode.window.showInformationMessage("File was undefined");
}