import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ColorCards } from "./ColorCards";
import { ColorCategoryCards } from "./ColorCategoryCards";
import { MENU_STAGE_PAINT } from "../../../actions/propertymenu";

export const PaintingAndDecorations = () => {
  // const menu = useSelector(state => state.propertymenu);

  // const getPaintingMenuStage = ms => {
  //   if (
  //     ms.menuStage === MENU_STAGE_PAINT ||
  //     ms.menuStagePrev === MENU_STAGE_PAINT
  //   ) {
  //     return <ColorCards />;
  //   }
  //   if (
  //     ms.menuStage === MENU_STAGE_PAINT_COLOR_SELECTION ||
  //     ms.menuStagePrev === MENU_STAGE_PAINT_COLOR_SELECTION
  //   ) {
  //     return (
  //       <Fragment>
  //         {/* <div className={a49MenuContainerTier1Class}>
  //           <ColorCards />
  //         </div>
  //         <div className={a49MenuContainerTier2Class}>
  //           <ColorCategoryCards />;
  //         </div> */}
  //       </Fragment>
  //     );
  //   }
  return <Fragment></Fragment>;
};

//   return getPaintingMenuStage(menu);
// };
