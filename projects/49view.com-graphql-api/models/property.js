const mongoose = global.db;

export const propertyModel = mongoose.model("properties", new mongoose.Schema({
  addressLine1: {type: String},
  description: {type: String},
  estateAgentAddress: {type: String},
  estateAgentBranch: {type: String},
  estateAgentName: {type: String},
  keyFeatures: [{type: String}],
  location: {type: {type: String}, coordinates: {type: [Number]}},
  name: {type: String},
  origin: {type: String},
  price: {type: Number},
  priceReadable: {type: String},
  priceUnity: {type: String},
  sourceHash: {type: String},

  floorplanUrl: {type: String},
  images: [],

  created: [{type: Date}],
  lastUpdate: [{type: Date}],

}, {strict: false}));
