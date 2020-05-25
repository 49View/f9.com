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
import {Badge, Button, FormControl, InputGroup, Spinner} from "react-bootstrap";
import {getFileNameOnlyNoExt} from "../../futuremodules/utils/utils";
import {useEffect} from "reactn";
import {connect, sendChatMessage} from "../../futuremodules/webrtc/client";
import {useAlertDangerNoMovie} from "../../futuremodules/alerts/alerts";
import {PropertyRightMenu} from "../PropertyPage/Property.styled";

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
      console.log(msg.data);
      if (msg.data && msg.data.operationType === "update" && msg.data.ns.coll === "uploads") {
          dispatch(['completed']);
      }
      if (msg.data && msg.data.operationType === "insert") {
        if ( msg.data.ns.coll === "daemon_crashes" ) {
          alertDanger(msg.data.fullDocument.crash);
          dispatch(['reset']);
        } else if (msg.data.ns.coll === "uploads") {
            dispatch(['fileDraggedUploaded', true]);
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
  }, [auth, wsconnection, state, alertDanger]);

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
            <InputGroup className="mb-3">
              <FormControl
                onKeyUp={(evt) => {
                  if ((evt.keyCode === 13 || evt.keyCode === 14)) {
                    window.Module.addScriptLine(evt.target.value);
                  }
                }}
              />
            </InputGroup>
            <Button onClick={() => window.Module.reloadShadersViaHttp()}>Reload shaders</Button>
          </DivReports>
        </ExcaliburGrid>
      </ContainerSectionShadowed>
      }
    </AnimFadeSection>
  );
};
