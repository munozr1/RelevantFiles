
import * as vscode from "vscode";

export function goTo(file: string ) {
  //convert the html file to ts file
  let newFile: string = file.replace(".html", ".ts");
  //open the newFile
  vscode.workspace.openTextDocument(newFile).then(doc => {
    vscode.window.showTextDocument(doc);
  });
}

export function sufficientEditorsOpen(){
  let sufficientEditors: boolean = false;
  if(vscode.window.visibleTextEditors.length >= 2){
    sufficientEditors = true;
  }
  return sufficientEditors;
}