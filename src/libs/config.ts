import { TextEncoder } from "util";
import {Uri, window, workspace} from "vscode";

export async function createConfigFile(){
      const folderResult = await window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
    });

      if (folderResult && folderResult.length === 1) {
        const folderUri = folderResult[0];
        await writeConfigFile(folderUri);
      }
  }


async function writeConfigFile(folderPath: Uri) {

    const outputPath = Uri.joinPath(folderPath, ".relevantrc");

    const template = JSON.stringify(defaultConfigFile, null, 2);

    await workspace.fs.writeFile(
      outputPath,
      new TextEncoder().encode(template)
    );
  }


const defaultConfigFile =  {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "yoMomma.ts": "Bruh.ts"
};


export async function linkFiles(currentFile: Uri, fileToLink: Uri)
{
  const configs = await workspace.findFiles(".relevantrc");
  if (configs.length > 1)
    {return window.showErrorMessage("Too many rc files in workspace");}
  if (configs.length == 0)
    {return window.showErrorMessage("No rc file found in workspace");}
  const configFile: Uri = configs[0];
  const configContents = (await workspace.fs.readFile(configFile)).toString();
  let links = JSON.parse(configContents);
  window.showInformationMessage(links["yoMomma.ts"]);

}

//TODO Check for new links in the relevantrc file
// check prettier example: https://github.com/prettier/prettier-vscode/blob/56f80b5aeef4e70d11b997875d324155805bb85d/src/PrettierEditService.ts