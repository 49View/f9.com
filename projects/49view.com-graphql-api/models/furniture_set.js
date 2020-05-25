const mongoose = global.db;

export const furnitureSetModel = mongoose.model("furniture_sets", new mongoose.Schema({}, {timestamps: true, strict: false}));
