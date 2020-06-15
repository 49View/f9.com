const mongoose = global.db;

export const colorModel = mongoose.model("colors", new mongoose.Schema({}, {timestamps: true, strict: false}));

