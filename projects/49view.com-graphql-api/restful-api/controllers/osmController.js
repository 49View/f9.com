import {osmModel} from "../../models/osm";

export const getTileWithCoords = async (lon, lat, radius) => {
  const ret = await osmModel.find({
      location:
        {
          $geoWithin:
            {$centerSphere: [[lon, lat], radius / 3963.2]}
        }
    }
  );
  return ret;
};

