
import * as vscode from "vscode";
import { Uri } from "vscode";


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
export async function goTo(file: string ) {
  try{
    await vscode.workspace.openTextDocument(file).then(doc => {
      vscode.window.showTextDocument(doc);
    });
  }
  catch{
    throw new Error(`Could not open the file: ${file}`);
    
  }
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
export async function openLeft(file: string){
  await vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup");
  await goTo(file);
}

/**
 * Opens a file in the second editor.
 * @param file : the file to open
 */
export async function openRight(file: string){
  await vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup");
  await goTo(file);
}

export async function createEditor(file: string){
  await vscode.commands.executeCommand("workbench.action.splitEditorRight");
  await vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup");
  await goTo(file);
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

export async function moveLeft(file: string){
  await goTo(file);
  await vscode.commands.executeCommand("workbench.action.moveEditorToPreviousGroup");
}
export async function moveRight(file: string){
  await goTo(file);
  // await vscode.commands.executeCommand("workbench.action.moveEditorToNextGroup");
}


export async function openFile(file: string){
      if(sufficientEditorsOpen()){
      switch(vscode.window.activeTextEditor?.viewColumn?.valueOf())
      {
        // if the active editor is the first editor
        case 1:
          // vscode.window.showInformationMessage("active editor is the first editor");
          // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(file))
            {
              console.log('file already open: Moving right');
              await moveRight(file);
            }
          else
            {
              console.log('file was not open: Opening right' );
              await openRight(file);
            }
          break;
        // if the active editor is the second editor
        case 2:
          // vscode.window.showInformationMessage("active editor is the second editor");
          // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
          if(isOpen(file))
            {await moveLeft(file);}
          else
            {await openLeft(file);}
          break;
        default:
          // vscode.window.showInformationMessage("active editor is neither the first nor the second editor");
          if(vscode.window.activeTextEditor)
          {
            // file = HtmlTs(vscode.window.activeTextEditor?.document.fileName);
            await goTo(vscode.window.activeTextEditor.document.fileName);
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




