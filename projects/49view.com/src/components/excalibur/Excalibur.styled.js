import "./Excalibur.styled.css";
import styled from "styled-components";

const mainPadding = "15px";
const wasmCanvasSize = {x: "720px", y: "480px"};

export const ExcaliburGrid = styled.div`{
  display: grid;
  margin-top: 10px;
  grid-gap: 10px;
  height: ${wasmCanvasSize.y};
  grid-template-columns: ${wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${wasmCanvasSize.x} - 10px );
  grid-template-rows: 30% 60% 10%;
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
