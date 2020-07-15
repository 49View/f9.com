const mongoose = global.db;

export const thumbnailMakerModel = mongoose.model("thumbnail_makers", new mongoose.Schema({
  filename: {type: String},
  group: {type: String},
  project: {type: String},
  username: {type: String},
  entityId: {type: mongoose.Schema.Types.ObjectId, ref: "entities", index: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", index: true, unique: false},
  thumb: {type: String}
}, {timestamps: true, strict: false}));
