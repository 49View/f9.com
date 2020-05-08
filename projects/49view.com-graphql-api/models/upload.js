const mongoose = global.db;

export const uploadModel = mongoose.model("uploads", new mongoose.Schema({
  filename: {type: String},
  group: {type: String},
  project: {type: String},
  useremail: {type: String},
  completed: {type: String}
}, {timestamps: true, strict: false}));
