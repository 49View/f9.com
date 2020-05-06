const mongoose = global.db;

export const uploadModel = mongoose.model("uploads", new mongoose.Schema({
  filename: {type: String, index: true, unique: true},
  group: {type: String},
  project: {type: String},
  useremail: {type: String},
}, {timestamps: true, strict: false}));
