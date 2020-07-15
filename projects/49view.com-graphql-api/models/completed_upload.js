const mongoose = global.db;

export const completedUploadModel = mongoose.model("completed_uploads", new mongoose.Schema({
  filename: {type: String},
  group: {type: String},
  project: {type: String},
  username: {type: String},
  entityId: {type: mongoose.Schema.Types.ObjectId, ref: "entities", index: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", index: true, unique: false}
}, {timestamps: true, strict: false}));
