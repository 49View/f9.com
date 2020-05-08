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
import {Button, Spinner} from "react-bootstrap";
import {alphaBool, getFileNameOnlyNoExt} from "../../futuremodules/utils/utils";
import {useEffect} from "reactn";
import {connect} from "../../futuremodules/webrtc/client";

const WasmGridCell = () => {
  const canvasContainer = useWasmContext(true);
  return <DivWasm ref={canvasContainer}/>;
}

export const Excalibur = () => {

  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(excaliburStateReducer, excaliburInitialState);
  const onDrop = useExcaliburDragAndDropCallback(dispatch);
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  // const entitiesApi = useApi('entities');
  const [wsconnection, setWSConnection] = useState(null);
  // const inChat = false;

  // console.log(state);

  useEffect(() => {
    const messageCallback = (msg) => {
      if ( msg.data && msg.data.operationType === "update") {
        dispatch(['completed', true]);
      }
    }

    if ( state.completed === true ) {
      const fname = getFileNameOnlyNoExt(state.fileDragged);
      window.Module.addScriptLine(`rr.load("${fname}")`)
      dispatch(['reset', true]);
    }

    if (!wsconnection && auth.user) {
      setWSConnection(connect(auth.user.name, null, messageCallback));
    }
  }, [auth, wsconnection, state]);

  return (
    <AnimFadeSection>
      {auth.user === null && <Redirect to={"/"}/>}
      {auth.user === undefined && <SpinnerTopMiddle/>}
      {auth.user && auth.user.name === "Dado" &&
      <ContainerSectionShadowed>
        <ExcaliburGrid>
          <WasmGridCell/>
          <DivDropZone>
          <FlexDragAndDrop alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100%"}
                           padding={"5px"} {...getRootProps()} cursor={"pointer"}>
            <Div>
              <input {...getInputProps()} />
              <h4>Drop your files here</h4>
            </Div>
          </FlexDragAndDrop>
          </DivDropZone>
          <DivReports>
            {state.fileDragged && !state.completed && <div><Spinner animation={"grow"} variant={"warning"}></Spinner></div>}
            {state.fileDragged}
            {state.fileDragged && (state.fileDraggedReadStatus ? <p>read: {alphaBool(state.fileDraggedReadStatus)}</p> : <p>reading...</p>)}
            {state.fileDragged && state.fileDraggedReadStatus && (state.fileDraggedUploaded ? <p>uploaded: {alphaBool(state.fileDraggedReadStatus)}</p> : <p>uploading...</p>)}
            <Button onClick={ () => { window.Module.addScriptLine(`rr.load("spotlight_basic")`)}}>Load Object</Button>
          </DivReports>
        </ExcaliburGrid>
      </ContainerSectionShadowed>
      }
    </AnimFadeSection>
  );
};
