import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Property.css";
import { setDate } from "../../../actions/datetime";

export const FourSeasons = () => {
  const dispatch = useDispatch();
  const dt = useSelector(state => state.datetime);

  let dayofyear = [31, 59, 90, 120, 151, 181, 212, 243, 273, 303, 334, 365];
  let daysinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const lastDayEnglishDatePostFix = dayOfMonth => {
    const ld = dayOfMonth % 10;

    if (ld === 1) return "st";
    if (ld === 2) return "nd";
    if (ld === 3) return "rd";
    return "th";
  };

  const dayToDate = d => {
    let d1 = Number(d) + 79;
    if (d1 > 365) d1 -= 365;
    let ret = "December 31st";
    let dayOfMonth = 1;
    let month = 0;
    for (; month < 12; month++) {
      if (d1 <= dayofyear[month]) {
        dayOfMonth = daysinmonth[month] - (dayofyear[month] - d1);
        break;
      }
    }

    dispatch(setDate(2019, month + 1, dayOfMonth));
    return ret;
  };

  const dateHumanReadable = () => {
    return (
      months[dt.mo - 1] +
      " " +
      dt.dd.toString() +
      lastDayEnglishDatePostFix(dt.dd)
    );
  };

  return (
    <div className="a49view-timeofday-grid my-3">
      <div className="a49view-timeofday-grid-title">Season</div>
      <div className="a49view-fourseasons-grid-index">
        <div>Spring</div> <div>Summer</div> <div>Autumn</div>
        <div>Winter</div>
      </div>
      <div className="a49view-timeofday-grid-imagebars">
        <img src="fourseasons.jpg" alt="" height="35px"></img>
      </div>
      <div className="a49view-timeofday-grid-control">
        <input
          type="range"
          className="a49view-timeofday-grid-control-slider slider"
          min="1"
          max="365"
          defaultValue="90"
          id="timeoftheday"
          name="season-slider"
          onChange={eb => {
            dayToDate(eb.target.value);
          }}
        />
      </div>
      <div className="a49view-timeofday-grid-value">{dateHumanReadable()}</div>
    </div>
  );
};
