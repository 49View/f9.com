import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import "./Property.css";
import { PropertyTier1MenuHeader } from "./PropertyTier1MenuHeader";
import { gotoNextMenu } from "../../../actions/propertymenu";
import axios from "axios";

const colArray = [
  {
    r: 200,
    g: 0,
    b: 0,
    key: "Red",
    name: "Reds"
  },
  {
    r: 255,
    g: 165,
    b: 0,
    key: "Orange",
    name: "Oranges"
  },
  {
    r: 220,
    g: 220,
    b: 0,
    key: "Yellow",
    name: "Yellows"
  },
  {
    r: 0,
    g: 220,
    b: 0,
    key: "Green",
    name: "Greens"
  },
  {
    r: 0,
    g: 0,
    b: 220,
    key: "Blue",
    name: "Blues"
  },
  {
    r: 128,
    g: 0,
    b: 128,
    key: "Purple",
    name: "Purples"
  },
  {
    r: 12,
    g: 12,
    b: 12,
    key: "Black",
    name: "Blacks"
  },
  {
    r: 0,
    g: 128,
    b: 128,
    key: "Teal",
    name: "Teals"
  },
  {
    r: 128,
    g: 128,
    b: 128,
    key: "Grey",
    name: "Greys"
  },
  {
    r: 255,
    g: 182,
    b: 193,
    key: "Pink",
    name: "Pinks"
  },
  {
    r: 255,
    g: 253,
    b: 208,
    key: "Cream",
    name: "Creams"
  },
  {
    r: 230,
    g: 230,
    b: 230,
    key: "White",
    name: "Whites"
  }
];

export const ColorCards = () => {
  const dispatch = useDispatch();

  const bgstyle = col => {
    return {
      backgroundColor: "rgba(" + col.r + "," + +col.g + "," + col.b + ", 1)"
    };
  };

  return (
    <Fragment>
      <PropertyTier1MenuHeader title="Real brands, real colors, paint on walls, ceilings, skirting, covings..."></PropertyTier1MenuHeader>
      <div className="a49viewColorCardContainer">
        {colArray.map(col => (
          <div key={col.key} className="forceCenterAlignedOnGrid">
            <div
              className="a49viewcolorCard"
              style={bgstyle(col)}
              onClick={async eb => {
                const cols = await axios.get(
                  `/entities/metadata/byGroupTags/color/` +
                    encodeURIComponent("#category#" + col.key)
                );
                dispatch(
                  gotoNextMenu({
                    key: col.key,
                    data: { col: col.key, cols: cols.data }
                  })
                );
              }}
            >
              <div className="."></div>
              <div className="a49view-card-color-name">{col.name}</div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
