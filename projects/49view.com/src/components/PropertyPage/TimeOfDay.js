import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Property.css";
import { setTime } from "../../../actions/datetime";

export const TimeOfDay = () => {
  const dispatch = useDispatch();
  const dt = useSelector(state => state.datetime);

  const secondsToHms = d => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);

    dispatch(setTime(h, m));
  };

  const timeHumanReadable = dt => {
    const hh = String(dt.hh).padStart(2, "0");
    const mm = String(dt.mm).padStart(2, "0");
    return hh + ":" + mm;
  };

  return (
    <div className="a49view-timeofday-grid">
      <div className="a49view-timeofday-grid-title">Time of the Day</div>
      <div className="a49view-timeofday-grid-index">
        <div>Night</div> <div>Sunrise</div> <div>Morning</div>{" "}
        <div>Afternoon</div> <div>Sunset</div> <div>Evening</div>{" "}
        <div>Night</div>
      </div>
      <div className="a49view-timeofday-grid-imagebars">
        <img src="timeoftheday.jpg" alt="" height="35px"></img>
      </div>
      <div className="a49view-timeofday-grid-control">
        <input
          type="range"
          className="a49view-timeofday-grid-control-slider slider"
          min="0"
          max="1439"
          defaultValue="630"
          id="timeoftheday"
          name="timeoftheday-slider"
          onChange={eb => {
            setTime(secondsToHms(eb.target.value * 60));
          }}
          //window.Module.addScriptLine(`rr.changeTime("18:00")`)
        />
      </div>
      <div className="a49view-timeofday-grid-value">
        {timeHumanReadable(dt)}
      </div>
    </div>
  );
};
