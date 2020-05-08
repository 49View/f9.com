import React, {useContext, useReducer, useState} from "react";
import {AuthContext} from "../../futuremodules/auth/authContext";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {Redirect} from "react-router-dom";
import {AnimFadeSection} from "../../futuremodules/reactComponentStyles/reactCommon.animations";
import {useDropzone} from "react-dropzone";
import {
  ContainerSectionShadowed,
  Div,
  FlexDragAndDrop
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {excaliburInitialState, excaliburStateReducer, useExcaliburDragAndDropCallback} from "./ExcaliburLogic";
import {useWasmContext} from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import {DivDropZone, DivReports, DivWasm, ExcaliburGrid} from "./Excalibur.styled";
import {Badge, Spinner} from "react-bootstrap";
import {getFileNameOnlyNoExt} from "../../futuremodules/utils/utils";
import {useEffect} from "reactn";
import {connect} from "../../futuremodules/webrtc/client";
import {useAlertDangerNoMovie, useAlertWarning} from "../../futuremodules/alerts/alerts";

const WasmGridCell = () => {
  const {canvasContainer} = useWasmContext(true);
  return <DivWasm ref={canvasContainer}/>;
}

export const Excalibur = () => {

  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(excaliburStateReducer, excaliburInitialState);
  const onDrop = useExcaliburDragAndDropCallback(dispatch);
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const [wsconnection, setWSConnection] = useState(null);
  const alertDanger = useAlertDangerNoMovie();

  useEffect(() => {
    const messageCallback = (msg) => {
      if (msg.data && msg.data.operationType === "update") {
        dispatch(['completed']);
      }
      if (msg.data && msg.data.operationType === "insert") {
        if ( msg.data.ns.coll === "daemon_crashes" ) {
          alertDanger(msg.data.fullDocument.crash);
          dispatch(['reset']);
        }
      }
    }

    if (state.stage === 0) {
      const fname = getFileNameOnlyNoExt(state.fileDragged);
      window.Module.addScriptLine(`rr.addSceneObject("${fname}", "${state.group}", "1")`)
      dispatch(['reset']);
    }

    if (!wsconnection && auth.user) {
      setWSConnection(connect(auth.user.name, null, messageCallback));
    }
  }, [auth, wsconnection, state]);

  const AssetLoadingStage = ({state}) => {

    const variantStages = (state, stage) => {
      if ( state.stage < stage ) return "secondary";
      if ( state.stage === stage ) return "warning";
      return "success";
    }

    return (
      <div>
        <p>{state.fileDragged}</p>
        <h3><Badge variant={variantStages(state, 1)}>Read </Badge>
          {state.stage === 1 && <Spinner animation={"grow"}
                                         variant={"warning"}/>}
        </h3>
        <h3><Badge variant={variantStages(state, 2)}>Upload </Badge>
          {state.stage === 2 && <Spinner animation={"grow"}
                                         variant={"warning"}/>}
        </h3>
        <h3><Badge variant={variantStages(state, 3)}>Elaborate </Badge>
          {state.stage === 3 && <Spinner animation={"grow"}
                                         variant={"warning"}/>}
        </h3>
      </div>
    );
  };

  return (
    <AnimFadeSection>
      {auth.user === null && <Redirect to={"/"}/>}
      {auth.user === undefined && <SpinnerTopMiddle/>}
      {auth.user &&
      <ContainerSectionShadowed>
        <ExcaliburGrid>
          <WasmGridCell/>
          <DivDropZone>
            <FlexDragAndDrop alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100%"}
                             padding={"5px"} {...getRootProps()} cursor={"pointer"}>
              <Div>
                <input {...getInputProps()} />
                <h4>Drop your files here</h4>
                {state.stage > 0 && <AssetLoadingStage state={state}/>}
              </Div>
            </FlexDragAndDrop>
          </DivDropZone>
          <DivReports>
          </DivReports>
        </ExcaliburGrid>
      </ContainerSectionShadowed>
      }
    </AnimFadeSection>
  );
};
