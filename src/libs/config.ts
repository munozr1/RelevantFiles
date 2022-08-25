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

export async function returnConfig(): Promise<Uri>{
  const configs = await workspace.findFiles(".relevantrc");
  if(!await workspace.fs.stat(configs[0]))
    {throw new Error('Config file not found');}
  return configs[0];
}


export async function linkFiles(currentFile: Uri, fileToLink: Uri)
{
  // Check if a config file exists
  const configFile = await returnConfig();


  //Return json config object
  const configContents = (await workspace.fs.readFile(configFile)).toString();
  let links = JSON.parse(configContents);
  // window.showInformationMessage(links["yoMomma.ts"]);
  links[currentFile.fsPath] = fileToLink.fsPath;
  window.showInformationMessage(JSON.stringify(links));


  // turn object to Uint8 to write back to the rc file
	const writeData = Buffer.from(JSON.stringify(links), 'utf8');
  await workspace.fs.writeFile(configFile, writeData);
}

//TODO Check for new links in the relevantrc file
// check prettier example: https://github.com/prettier/prettier-vscode/blob/56f80b5aeef4e70d11b997875d324155805bb85d/src/PrettierEditService.ts