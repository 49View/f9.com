const mongoose = global.db;

export const propertyModel = mongoose.model("properties", new mongoose.Schema({
  name: {type: String},
  status: {type: String},
  origin: {type: String, index: true, unique: true},
  buyOrLet: {type: String},
  addressLine1: {type: String},
  addressLine2: {type: String},
  addressLine3: {type: String},
  description: {type: String},
  keyFeatures: [{type: String}],
  location: {type: {type: String}, coordinates: {type: [Number]}},
  price: [{type: Number}],
  priceReadable: {type: String},
  priceUnity: {type: String},
  floorplanUrl: {type: String},
  thumbs: [{type: String}],
  images: [{type: String}],

  userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", index: true, unique: true},
  estateAgentId: {type: mongoose.Schema.Types.ObjectId, ref: "properties", index: true, unique: false},

}, {timestamps: true, strict: false}));
