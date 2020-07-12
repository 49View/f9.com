import "./Excalibur.styled.css";
import styled from "styled-components";

const mainPadding = "15px";

export const ExcaliburGrid = styled.div`{  
  display: grid;
  grid-gap: 0 10px;
  height: calc(${props => props.wasmCanvasSize.y} + 50px);
  grid-template-columns: ${props => props.wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${props => props.wasmCanvasSize.x} - 10px );
  grid-template-rows: calc(${props => props.wasmCanvasSize.y} * 0.3) calc(${props => props.wasmCanvasSize.y} * 0.7) 50px;
  grid-template-areas: "wasm dropzone"
                       "wasm report"
                       "wscript report";
}`;

export const DivWasm = styled.div`{
  grid-area: wasm;
}`;

export const DivReports = styled.div`{
  grid-area: report;
}`;

export const DivDropZone = styled.div`{
  grid-area: dropzone;
}`;

export const ExcaliburScriptGrid = styled.div`{
  grid-area: wscript;
}`;

export const DivTags = styled.div`{
  width: 100%;
  overflow: auto;
}`;
