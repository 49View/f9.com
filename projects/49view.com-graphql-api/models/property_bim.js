const mongoose = global.db;

export const propertyBimModel = mongoose.model("property_bims", new mongoose.Schema({
  propertyId: {type: mongoose.Schema.Types.ObjectId, ref: "properties", index: true, unique: true},
}, {timestamps: true, strict: false}));
