const mongoose = global.db;

export const uploadModel = mongoose.model("uploads", new mongoose.Schema({
  filename: {type: String},
  group: {type: String},
  project: {type: String},
  username: {type: String},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", index: true, unique: false}
}, {timestamps: true, strict: false}));
