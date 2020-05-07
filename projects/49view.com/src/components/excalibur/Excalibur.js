import React, {useContext} from "react";
import {AuthContext} from "../../futuremodules/auth/authContext";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {Redirect} from "react-router-dom";
import {AnimSlideIn} from "../../futuremodules/reactComponentStyles/reactCommon.animations";
import {useDropzone} from "react-dropzone";
import {
  ContainerSectionShadowed,
  Div,
  FlexDragAndDrop
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {useExcaliburDragAndDropCallback} from "./ExcaliburLogic";

export const Excalibur = () => {

  const auth = useContext(AuthContext);
  const onDrop = useExcaliburDragAndDropCallback();
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <AnimSlideIn>
      {auth.user === null && <Redirect to={"/"}/>}
      {auth.user === undefined && <SpinnerTopMiddle/>}
      {auth.user && auth.user.name === "Dado" &&
      <ContainerSectionShadowed>
        <FlexDragAndDrop alignItems={"center"} justifyContent={"center"} width={"300px"} height={"300px"}
              padding={"5px"} {...getRootProps()} cursor={"pointer"}>
          <Div>
            <input {...getInputProps()} />
            <h4>Drop your files here</h4>
          </Div>
        </FlexDragAndDrop>
      </ContainerSectionShadowed>}
    </AnimSlideIn>
  );
};
