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
import {Div, Flex, Mx1, My25} from "../../futuremodules/reactComponentStyles/reactCommon.styled";

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
  const d1 = Date.now();
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
    case 'loadEntity':
      return {
        ...state,
        filenameKey: action[1].name
      }
    case 'thumbLoaded':
      return {
        ...state,
        refreshToken: d1.toString(),
        thumb: action[1]
      }
    case 'refreshToken':
      return {
        ...state,
        refreshToken: d1.toString(),
      }
    case 'reset':
      return {
        ...excaliburInitialState,
        refreshToken: d1.toString(),
      };
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
    <Flex flexDirection={"column"} flexWrap={"wrap"} justifyContent={"flex-start"}>
      <Div wordBreak={"break-all"}>{state.fileDragged}</Div>
      <My25/>
      <Flex>
        <Mx1/>
        <h5><Badge variant={variantStages(state, 1)}>Read </Badge>
          {state.stage === 1 && <Spinner animation={"grow"} size="sm"
                                         variant={"warning"}/>}
        </h5>
        <Mx1/>
        <h5><Badge variant={variantStages(state, 2)}>Upload </Badge>
          {state.stage === 2 && <Spinner animation={"grow"} size="sm"
                                         variant={"warning"}/>}
        </h5>
        <Mx1/>
        <h5><Badge variant={variantStages(state, 3)}>Elaborate </Badge>
          {state.stage === 3 && <Spinner animation={"grow"} size="sm"
                                         variant={"warning"}/>}
        </h5>
      </Flex>
    </Flex>
  );
};

// ------------------------------
// GraphQL Queries
// ------------------------------

const entityByNameQuery = (name, refreshToken) => gql`{
    entityRefresh(name:"${name}", refreshToken:"${refreshToken}"){
        _id
        name
        hash
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
    // We might need to add this to the code template. What this condition is doing is to check if the main input of
    // the query is null, in that case we shall reset the query, the reason being sometimes on null query the cache
    // thinks nothing has changed so it will keep refreshing the previous result
    if (!name) {
      setEntityByName(null);
    }
  }, [name, queryRes, setEntityByName]);

  return {
    entityByName,
    setEntityByName,
  }
};

const entityMetaQuery = (partialSearch, group, page, pageLimit, refreshToken) => {
  return gql`{
      entitiesPage(partialSearch:"${partialSearch}", page: ${page}, pageLimit: ${pageLimit}, group:"${group}", refreshToken:"${refreshToken}") {
          nodes {
              _id
              name
              group
              thumb
              hash
              tags
          }
          pageInfo {
              page
              pageLimit
              totalCount
              lastPage
              hasPreviousPage
              hasNextPage
          }
      }
  }`;
};

export const useQLEntityMeta = (name, group, page, pageLimit, refreshToken) => {
  const [entityMeta, setEntityMeta] = useState(null);
  const queryRes = useQuery(entityMetaQuery(name, group, page, pageLimit, refreshToken));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setEntityMeta(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setEntityMeta, page, pageLimit]);

  return {
    entities: entityMeta && entityMeta.nodes,
    pageInfo: entityMeta && entityMeta.pageInfo
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
      if (fid) {
        window.Module.addScriptLine(`rr.addSceneObject("${fid}", "${state.group}", true)`)
      }
      dispatch(['completeAndReset']);
    }

    if (!wsconnection && auth.user) {
      setWSConnection(connect(auth.user.name, null, messageCallback));
    }
  }, [auth, wsconnection, state, alertDanger, dispatch]);
}
