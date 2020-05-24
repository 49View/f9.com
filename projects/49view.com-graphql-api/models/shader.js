const mongoose = global.db;

export const shaderModel = mongoose.model("shaders", new mongoose.Schema({
  version: {type: String},
  text: {type: String},
}, {timestamps: true, strict: false}));
