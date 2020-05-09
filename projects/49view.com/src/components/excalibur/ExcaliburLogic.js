import {api, useApi} from "../../futuremodules/api/apiEntryPoint";
import {useCallback} from "react";
import {addEntity} from "../../futuremodules/entities/entitiesApiCalls";
import {useAlertWarning, useMultiChoiceAlert} from "../../futuremodules/alerts/alerts";
import {getPossibleGroupFromFilename} from "../../futuremodules/entities/entitiesAccessors";

export const useExcaliburDragAndDropCallback = (dispatch) => {
  const entitiesApi = useApi('entities');
  const alertWarning = useAlertWarning();
  const multiGroupAlert = useMultiChoiceAlert();

  const onDrop = useCallback(
    async (acceptedFiles) => {

      const readFileAsync = (file) => {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            dispatch(['fileDraggedReadStatus', true]);
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

      const singleFileRead = async (acceptedFile, group) => {
        const fileContent = await readFileAsync(acceptedFile);
        api(entitiesApi, addEntity, group, acceptedFile.name, fileContent).then();
      }

      try {
        if (acceptedFiles.length === 1) {
          const group = getPossibleGroupFromFilename(acceptedFiles[0].name);
          if (group === undefined) {
            multiGroupAlert("Different groups avaiable",
              "Choose which group this asset belongs to",
              ["geom", "material"],
              async (group) => {
                dispatch(['fileDragged', acceptedFiles[0].name, group]);
                await singleFileRead(acceptedFiles[0], group);
              });
          } else if (group) {
            dispatch(['fileDragged', acceptedFiles[0].name, group]);
            await singleFileRead(acceptedFiles[0], group);
          } else {
            dispatch(['reset']);
            alertWarning("I do not recognise this file format, sorry bout that!");
          }
        } else if (acceptedFiles.length > 1) {
          console.log("Do we really support multiple files? :O");
        }
      } catch (e) {
        console.log(e);
      }
    }, [entitiesApi, dispatch, alertWarning, multiGroupAlert]);

  return onDrop;
}

export const excaliburInitialState = {
  stage: -1,
  fileDragged: null,
  group: null,
  fileDraggedReadStatus: null,
  fileDraggedUploaded: null,
  completed: null
};

export const excaliburStateReducer = (state, action) => {
  switch (action[0]) {
    case 'fileDragged':
      return {
        ...state,
        fileDragged: action[1],
        group: action[2],
        stage: 1,
      };
    case 'fileDraggedReadStatus':
      return {
        ...state,
        fileDraggedReadStatus: action[1],
        stage: 2
      };
    case 'fileDraggedUploaded':
      return {
        ...state,
        fileDraggedUploaded: action[1],
        stage: 3
      };
    case 'completed':
      return {
        ...state,
        stage: 0
      }
    case 'reset':
      return excaliburInitialState;
    default:
      throw new Error("dashBoardManager reducer is handling an invalid action: " + JSON.stringify(action));
  }
}
