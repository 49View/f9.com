const mongoose = global.db;

export const locationModel = mongoose.model("locations", new mongoose.Schema({
  country: {type: String},
  locationName: {type: String, index: true},
  locationLink: {type: String},
  locality: {type: String},
  location: {type: {type: String}, coordinates: {type: [Number]}},
  gridReference: {type: String},
}, {timestamps: true, strict: false}));
