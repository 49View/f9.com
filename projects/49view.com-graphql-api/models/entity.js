const mongoose = global.db;

export const entityModel = mongoose.model("entities", new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  group: {type: String},
  source: {type: String},
  name: {type: String},
  project: {type: String},
  isPublic: {type: Boolean},
  isRestricted: {type: Boolean},
  contentType: {type: String},
  hash: {type: String},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", index: true, unique: false},
  thumb: {type: String},
  tags: [{type: String}]
}, {timestamps: true, strict: false}));
