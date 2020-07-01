import {locationModel} from "../../models/location";

const convertDMSToDD = dms => {
  let parts = dms.split(/([0-9]{1,2})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})*["|″]*([N|S|W|E])/);
  let degrees = parseFloat(parts[1]);
  let minutes = parseFloat(parts[2]);
  let seconds = parts[3] ? parseFloat(parts[3].replace(',','.')) : 0.0;
  let direction = parts[4];

  // console.log('degrees: '+degrees)
  // console.log('minutes: '+minutes)
  // console.log('seconds: '+seconds)
  // console.log('direction: '+direction)

  let dd = degrees + minutes / 60 + seconds / (60 * 60);

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

export const importLocations = async (content, country) => {

  const locations = content.map( elem => {
    let loc = elem;
    if ( !loc.latitude || !loc.longitude ) return null;
    loc.country = country;
    loc.location = {
      type: "Point",
      coordinates: [convertDMSToDD(loc.longitude), convertDMSToDD(loc.latitude)]
    }
    delete loc.latitude;
    delete loc.longitude;
    return loc;
  });

  return locationModel.insertMany(locations);
};

