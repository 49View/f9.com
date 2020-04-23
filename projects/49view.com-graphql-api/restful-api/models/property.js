const mongoose = global.db;

export const propertyModel = mongoose.model("properties", new mongoose.Schema({}, {strict: false}));
