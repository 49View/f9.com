import {api, useApi} from "../../futuremodules/api/apiEntryPoint";
import React, {useCallback, useEffect, useState} from "react";
import {addEntity} from "../../futuremodules/entities/entitiesApiCalls";
import {useAlertDangerNoMovie, useAlertWarning, useMultiChoiceAlert} from "../../futuremodules/alerts/alerts";
import {getPossibleGroupFromFilename} from "../../futuremodules/entities/entitiesAccessors";
import {Badge, Spinner} from "react-bootstrap";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";
import {getFileName} from "../../futuremodules/utils/utils";
import {connect} from "../../futuremodules/webrtc/client";
import {FlexVertical} from "../../futuremodules/reactComponentStyles/reactCommon.styled";

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
  filenameKey: null,
  group: null,
  entityId: null,
  thumb: null,
  fileDraggedReadStatus: null,
  fileDraggedUploaded: null,
  completed: null,
  refreshToken: null
};

export const excaliburStateReducer = (state, action) => {
  const d1 = new Date();
  switch (action[0]) {
    case 'fileDragged':
      return {
        ...state,
        fileDragged: action[1],
        filenameKey: getFileName(action[1]),
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
        entityId: action[1],
        stage: 0
      }
    case 'thumbLoaded':
      return {
        ...state,
        refreshToken: d1.toString(),
        thumb: action[1]
      }
    case 'reset':
      return excaliburInitialState;
    case 'completeAndReset':
      return {
        ...excaliburInitialState,
        refreshToken: d1.toString(),
        filenameKey: state.filenameKey,
        entityId: state.entityId,
        thumb: state.thumb
      };
    case 'entityTagsChanged':
      return {
        ...state,
        refreshToken: d1.toString()
      };
    default:
      throw new Error("dashBoardManager reducer is handling an invalid action: " + JSON.stringify(action));
  }
}

export const AssetLoadingStage = ({state}) => {

  const variantStages = (state, stage) => {
    if (state.stage < stage) return "secondary";
    if (state.stage === stage) return "warning";
    return "success";
  }

  return (
    <FlexVertical justifyContent={"flex-start"}>
      <div overflow={"hidden"}>{state.fileDragged}</div>
      <div>
      <h3><Badge variant={variantStages(state, 1)}>Read </Badge>
        {state.stage === 1 && <Spinner animation={"grow"}
                                       variant={"warning"}/>}
      </h3>
      </div>
      <div>
      <h3><Badge variant={variantStages(state, 2)}>Upload </Badge>
        {state.stage === 2 && <Spinner animation={"grow"}
                                       variant={"warning"}/>}
      </h3>
      </div>
        <div>
      <h3><Badge variant={variantStages(state, 3)}>Elaborate </Badge>
        {state.stage === 3 && <Spinner animation={"grow"}
                                       variant={"warning"}/>}
      </h3>
        </div>
    </FlexVertical>
  );
};

// ------------------------------
// GraphQL Queries
// ------------------------------

const entityByNameQuery = (name, refreshToken) => gql`{
    entityRefresh(name:"${name}", refreshToken:"${refreshToken}"){
        _id
        name
        group
        tags
        thumb
        bboxSize
    }
}`;

// ------------------------------
// GraphQL Mutations
// ------------------------------

export const addEntityTagsMutation = gql`
    mutation AddEntityTagsMutation($entityId: ID!, $tags: [String!]) {
        addEntityTagsMutation(entityId: $entityId, tags: $tags )
    }`;

export const removeEntityTagMutation = gql`
    mutation RemoveEntityTagMutation($entityId: ID!, $tag: String!) {
        removeEntityTagMutation(entityId: $entityId, tag: $tag)
    }`;

export const useAddEntityTags = () => {
  const [addEntityTagsMutationRet] = useMutation(addEntityTagsMutation);

  const updater = (entityId, tags, dispatch) => {
    addEntityTagsMutationRet({
      variables: {
        entityId,
        tags
      }
    }).then((r) => dispatch(['entityTagsChanged']));
  };

  return updater;
};

export const useRemoveEntityTag = () => {
  const [removeEntityTagMutationRet] = useMutation(removeEntityTagMutation);

  const updater = (entityId, tag, dispatch) => {
    removeEntityTagMutationRet({
      variables: {
        entityId,
        tag
      }
    }).then((r) => dispatch(['entityTagsChanged']));
  };

  return updater;
};

// ------------------------------
// Hooks
// ------------------------------

export const useQLEntityByName = (name, refreshToken) => {
  const [entityByName, setEntityByName] = useState(null);
  const queryRes = useQuery(entityByNameQuery(name, refreshToken));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setEntityByName(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setEntityByName]);

  return {
    entityByName,
    setEntityByName,
  }
};

const entityMetaQuery = (partialSearch) => {
  return gql`{
      entities(partialSearch:"${partialSearch}") {
          _id
          name
          group
          thumb
          hash
          tags
      }
  }`;
};

export const useQLEntityMeta = (name) => {
  const [entityMeta, setEntityMeta] = useState(null);
  const queryRes = useQuery(entityMetaQuery(name));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setEntityMeta(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setEntityMeta]);

  return {
    entityMeta,
    setEntityMeta,
  }
};

export const useEHImportFlow = (auth, state, dispatch) => {
  const [wsconnection, setWSConnection] = useState(null);
  const alertDanger = useAlertDangerNoMovie();

  useEffect(() => {
    const messageCallback = (msg) => {
      console.log(msg.data);
      // if (msg.data && msg.data.operationType === "update" && msg.data.ns.coll === "uploads") {
      //   dispatch(['completed', msg.data.updateDescription.updatedFields.entityId]);
      // }
      if (msg.data && msg.data.operationType === "insert") {
        if (msg.data.ns.coll === "daemon_crashes") {
          alertDanger(msg.data.fullDocument.crash);
          dispatch(['reset']);
        } else if (msg.data.ns.coll === "uploads") {
            dispatch(['fileDraggedUploaded', true]);
        } else if (msg.data.ns.coll === "completed_uploads") {
          dispatch(['completed', msg.data.fullDocument.entityId]);
        } else if (msg.data.ns.coll === "thumbnail_makers") {
          dispatch(['thumbLoaded', msg.data.fullDocument.thumb]);
        }
      }
    }

    if (state.stage === 0) {
      const fid = state.entityId;// ? state.entityId : getFileNameOnlyNoExt(state.fileDragged);
      if ( fid ) {
        window.Module.addScriptLine(`rr.addSceneObject("${fid}", "${state.group}", "1")`)
      }
      dispatch(['completeAndReset']);
    }

    if (!wsconnection && auth.user) {
      setWSConnection(connect(auth.user.name, null, messageCallback));
    }
  }, [auth, wsconnection, state, alertDanger, dispatch]);
}
