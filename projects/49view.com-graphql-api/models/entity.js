const mongoose = global.db;

export const entityModel = mongoose.model("entities", new mongoose.Schema({}, {strict: false}));
