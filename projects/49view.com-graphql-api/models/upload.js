const mongoose = global.db;

export const uploadModel = mongoose.model("uploads", new mongoose.Schema({
  filename: {type: String},
  group: {type: String},
  project: {type: String},
  username: {type: String},
  thumb: {type: String}
}, {timestamps: true, strict: false}));
