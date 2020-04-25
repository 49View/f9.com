const mongoose = global.db;

export const propertyBinaryModel = mongoose.model("property_binaries", new mongoose.Schema({
  propertyId: {type: mongoose.Schema.Types.ObjectId, ref: "properties", index: true, unique: true},
  floorplan: {type: mongoose.Schema.Types.Buffer},
  thumbs:[{type: mongoose.Schema.Types.Buffer}],
  images:[{type: mongoose.Schema.Types.Buffer}],
  captions:[{type: String}]
}, {timestamps: true, strict: false}));
