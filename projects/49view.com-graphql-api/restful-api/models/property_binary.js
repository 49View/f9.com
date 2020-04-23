const mongoose = global.db;

export const propertyBinaryModel = mongoose.model("property_binaries", new mongoose.Schema({}, {strict: false}));
