import React, { Fragment } from "react";
import { PropertyTier1MenuHeader } from "./PropertyTier1MenuHeader";
import { FourSeasons } from "./FourSeasons";
import { TimeOfDay } from "./TimeOfDay";

export const DateAndTime = () => {
  return (
    <Fragment>
      <PropertyTier1MenuHeader title="Choose any season any time of the day." />
      <TimeOfDay></TimeOfDay>
      <FourSeasons></FourSeasons>
    </Fragment>
  );
};
