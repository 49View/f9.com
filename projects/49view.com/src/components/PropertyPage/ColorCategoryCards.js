import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Property.css";
import { PropertyTier1MenuHeader } from "./PropertyTier1MenuHeader";
import { setPaintColor } from "../../../actions/paintcolor";
import { addPaintingQuote } from "../../../actions/quotes";
import { setLayoutTabIndex } from "../../../actions/propertymenu";

function hexAToRGBA(h) {
  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  if (h.length === 5) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    a = "0x" + h[4] + h[4];
  } else if (h.length === 9) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = "0x" + h[7] + h[8];
  }
  r = +(r / 255).toFixed(3);
  g = +(g / 255).toFixed(3);
  b = +(b / 255).toFixed(3);
  a = +(a / 255).toFixed(3);

  return { r: r, g: g, b: b, a: a };
}

export const ColorCategoryCards = () => {
  const dispatch = useDispatch();
  const colArray = useSelector(state => state.propertymenu.data.cols);
  const colKey = useSelector(state => state.propertymenu.data.key);

  const bgstyle = col => {
    return {
      backgroundImage: `url(" data:image/png;base64,${col}")`
    };
  };

  const nameRecover = col => {
    const spl1 = col.split("_#", 1);
    const rep = spl1[0].replace("_", " ");
    return rep;
  };

  const colorRecover = tags => {
    for (const tag of tags) {
      const t1 = tag.substring(0, 4);
      if (t1 === "#hex") {
        return hexAToRGBA(tag.substring(4, tag.length));
      }
    }
    return hexAToRGBA("#FFFFFFFF");
  };

  return (
    <Fragment>
      <PropertyTier1MenuHeader title={colKey}></PropertyTier1MenuHeader>

      <div className="a49viewColorCardContainer">
        {colArray.map(col => (
          <div key={col.metadata.name} className="forceCenterAlignedOnGrid">
            <div
              className="a49viewcolorCard"
              style={bgstyle(col.metadata.thumb)}
              onClick={async eb => {
                // const cols = await axios.get(
                //   `/entities/metadata/byGroupTags/color/` +
                //     encodeURIComponent("#category#" + col.key)
                // );
                dispatch(setPaintColor(colorRecover(col.metadata.tags)));
                dispatch(addPaintingQuote());
                dispatch(setLayoutTabIndex(3));
              }}
            >
              <div className="."></div>
              <div className="a49view-card-color-name">
                {nameRecover(col.metadata.name)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
