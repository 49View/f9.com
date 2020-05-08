import {api, useApi} from "../../futuremodules/api/apiEntryPoint";
import {useCallback} from "react";
import {addEntity} from "../../futuremodules/entities/entitiesApiCalls";

export const useExcaliburDragAndDropCallback = (dispatch) => {
  const entitiesApi = useApi('entities');

  const onDrop = useCallback(
    async (acceptedFiles) => {

      const readFileAsync = (file) => {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            dispatch(['fileDraggedReadStatus', true]);
            console.log("Finished loading ", file.name);
            resolve(reader.result);
          };
          reader.onerror = () => {
            reader.abort();
            dispatch(['fileDraggedReadStatus', false]);
            reject("Cannot open file");
          }
          reader.readAsArrayBuffer(file);
        })
      }

      const singleFileRead = async (acceptedFile) => {
        // if (checkFileExtensionsOnEntityGroup(groupSelected, acceptedFile.name)) {
        const fileContent = await readFileAsync(acceptedFile);
        api(entitiesApi, addEntity, "geom", acceptedFile.name, fileContent).then(r => {
          console.log(r);
          dispatch(['fileDraggedUploaded', true]);
        });
        // } else {
        //   alertWarning(alertStore, "Wrong file type for this entity type");
        // }
      }

      try {
        if (acceptedFiles.length === 1) {
          dispatch(['fileDragged', acceptedFiles[0].name]);
          await singleFileRead(acceptedFiles[0]);
        } else if (acceptedFiles.length > 1) {
          console.log("Do we really support multiple files? :O");
        }
      } catch (e) {
        console.log(e);
      }
    }, [entitiesApi, dispatch]);

  return onDrop;
}

export const excaliburInitialState = {
  fileDragged: null,
  fileDraggedReadStatus: null,
  fileDraggedUploaded: null,
  completed: null
};

export const excaliburStateReducer = (state, action) => {
  switch (action[0]) {
    case 'fileDragged':
      return {
        ...state,
        fileDragged: action[1]
      };
    case 'fileDraggedReadStatus':
      return {
        ...state,
        fileDraggedReadStatus: action[1]
      };
    case 'fileDraggedUploaded':
      return {
        ...state,
        fileDraggedUploaded: action[1]
      };
    case 'completed':
      return {
        ...state,
        completed: action[1]
      }
    case 'reset':
      return excaliburInitialState;
    default:
      throw new Error("dashBoardManager reducer is handling an invalid action: " + JSON.stringify(action));
  }
}
