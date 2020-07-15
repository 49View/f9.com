import React, {useContext, useReducer} from "react";
import {AuthContext} from "../../futuremodules/auth/authContext";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {Redirect} from "react-router-dom";
import {AnimFadeSection} from "../../futuremodules/reactComponentStyles/reactCommon.animations";
import {useDropzone} from "react-dropzone";
import {
  ContainerSectionShadowedInfinite,
  Div,
  Flex,
  FlexDragAndDrop
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {
  AssetLoadingStage,
  excaliburInitialState,
  excaliburStateReducer,
  useEHImportFlow,
  useExcaliburDragAndDropCallback,
  useQLEntityByName
} from "./ExcaliburLogic";
import {useWasmContext} from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import {DivDropZone, DivReports, DivWasm, ExcaliburGrid, ExcaliburScriptGrid} from "./Excalibur.styled";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {EntityAndTags} from "./EntityAndTags";
import {EntityBrowser} from "./EntityBrowser";

const wasmCanvasSize = {x: "720px", y: "480px"};

const WasmGridCell = () => {
  const {canvasContainer} = useWasmContext(true);
  return <DivWasm ref={canvasContainer}/>;
}

export const Excalibur = () => {

  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(excaliburStateReducer, excaliburInitialState);
  const {entityByName} = useQLEntityByName(state.filenameKey, state.refreshToken);
  const onDrop = useExcaliburDragAndDropCallback(dispatch);
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  useEHImportFlow(auth, state, dispatch);

  return (
    <AnimFadeSection>
      {auth.user === null && <Redirect to={"/"}/>}
      {auth.user === undefined && <SpinnerTopMiddle/>}
      {auth.user &&
      <ContainerSectionShadowedInfinite>
        <ExcaliburGrid wasmCanvasSize={wasmCanvasSize}>
          <WasmGridCell/>
          <DivDropZone>
            <FlexDragAndDrop alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100%"}
                             padding={"5px"} {...getRootProps()} cursor={"pointer"}>
              <Div>
                <input {...getInputProps()} />
                {state.stage > 0 ? <AssetLoadingStage state={state}/> : <h4>Drop your files here</h4>}
              </Div>
            </FlexDragAndDrop>
          </DivDropZone>
          <DivReports>
            {entityByName && <EntityAndTags entity={entityByName} dispatch={dispatch}/>}
          </DivReports>
          <ExcaliburScriptGrid>
            <Flex>
              <InputGroup>
                <FormControl
                  onKeyUp={(evt) => {
                    if ((evt.keyCode === 13 || evt.keyCode === 14)) {
                      window.Module.addScriptLine(evt.target.value);
                    }
                  }}
                />
              </InputGroup>
              <Div margin={"0 0 0 10px"}>
                <Button onClick={() => window.Module.reloadShadersViaHttp()}>Shaders</Button>
              </Div>
            </Flex>
          </ExcaliburScriptGrid>
        </ExcaliburGrid>
        <EntityBrowser width={wasmCanvasSize.x} dispatch={dispatch}/>
      </ContainerSectionShadowedInfinite>
      }
    </AnimFadeSection>
  );
};
