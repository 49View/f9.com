import React from "react";
import { useDispatch } from "react-redux";
import { gotoPrevMenu } from "../../../actions/propertymenu";

export const PropertyTier1MenuHeader = props => {
  const dispatch = useDispatch();

  return (
    <div className="a49view-timeoftheday-title">
      <div className="a49view-mainseletion-back-title-text">{props.title}</div>
      <div
        className="a49view-mainseletion-back-icon"
        onClick={() => dispatch(gotoPrevMenu())}
      >
        <i className="fas fa-arrow-alt-circle-left"></i>
      </div>
    </div>
  );
};
