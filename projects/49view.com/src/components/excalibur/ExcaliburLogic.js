import {getFileNameExt, getFileNameOnlyNoExt} from "../../futuremodules/utils/utils";
import {api, useApi} from "../../futuremodules/api/apiEntryPoint";
import {useCallback} from "react";
import {addEntity} from "../../futuremodules/entities/entitiesApiCalls";

const tar = require("tar-stream");

const chooseFilenameFromMultiFiles = (files, group) => {
  if (group === "geom") {
    for (const file of files) {
      if (getFileNameExt(file.name) === "fbx") {
        return getFileNameOnlyNoExt(file.name) + ".fbx_folder";
      }
    }
  }
  return null;
}

var isArrayBufferSupported = (new Buffer(new Uint8Array([1]).buffer)[0] === 1);

var arrayBufferToBuffer = isArrayBufferSupported ? arrayBufferToBufferAsArgument : arrayBufferToBufferCycle;

function arrayBufferToBufferAsArgument(ab) {
  return new Buffer(ab);
}

function arrayBufferToBufferCycle(ab) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

export const useExcaliburDragAndDropCallback = () => {
  const entitiesApi = useApi('entities');

  const onDrop = useCallback(
    async (acceptedFiles) => {

      const readFileAsync = (file) => {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            console.log("Finished loading ", file.name);
            resolve(reader.result);
          };
          reader.onerror = () => {
            reader.abort();
            console.log("Error loading ", file.name);
            reject("Cannot open file");
          }
          reader.readAsArrayBuffer(file);
        })
      }

      const readFileAsyncS = async (file) => {
        try {
          return await readFileAsync(file);
        } catch (e) {
          return null;
        }
      }

      const singleFileRead = async (acceptedFile) => {
        // check file dragged has a valid extension for asset type
        // console.log("Group selected is", groupSelected);
        // if (checkFileExtensionsOnEntityGroup(groupSelected, acceptedFile.name)) {
        const fileContent = await readFileAsync(acceptedFile);
        console.log("Read file ok!");
        api(entitiesApi, addEntity, "geom", acceptedFile.name, fileContent).then(r => console.log(r));
        // } else {
        //   alertWarning(alertStore, "Wrong file type for this entity type");
        // }
      }

      // const multiFileRead = async (acceptedFiles) => {
      //
      //   const filename = chooseFilenameFromMultiFiles(acceptedFiles, groupSelected);
      //
      //   if (filename == null) {
      //     alertWarning("No files for " + groupSelected + " group has been selected.");
      //     return;
      //   }
      //
      //   let abuffers = [];
      //   let tarPack = tar.pack();
      //
      //   for (let i = 0; i < acceptedFiles.length; i++) {
      //     const ab = await readFileAsyncS(acceptedFiles[i]);
      //     if (ab) {
      //       abuffers.push({
      //         name: acceptedFiles[i].name,
      //         size: ab.byteLength,
      //         data: ab
      //       });
      //     }
      //   }
      //
      //   // tarPack.on('error', reject);
      //   const packEntry = (err) => {
      //     if (err) {
      //       console.log("Error");
      //       // reject(err);
      //     } else if (abuffers.length) {
      //       console.log("Buffer length", abuffers.length)
      //       const fileEntry = abuffers.pop();
      //       let entry = tarPack.entry({name: fileEntry.name, size: fileEntry.size}, packEntry);
      //       entry.write(arrayBufferToBuffer(fileEntry.data));
      //       entry.end();
      //     } else {
      //       console.log("Finalise");
      //       tarPack.finalize();
      //       // const fileContent = tarWrite(tarPack);
      //       // dispatch(addEntity(filename, fileContent, groupSelected));
      //       // resolve();
      //     }
      //   }
      //   packEntry();
      // }

      try {
        if (acceptedFiles.length === 1) {
          await singleFileRead(acceptedFiles[0]);
        } else if (acceptedFiles.length > 1) {
          console.log("Do we really support multiple files? :O");
          // await multiFileRead(acceptedFiles);
        }
      } catch (e) {
        console.log(e);
      }
    }
    , [entitiesApi]);

  return onDrop;
}
