const mongoose = global.db;

export const estateAgentModel = mongoose.model("estate_agents", new mongoose.Schema({
  address: {type: String},
  branch: {type: String},
  name: {type: String},
  logo: {type: mongoose.Schema.Types.Buffer},
  properties: [{type: mongoose.Schema.Types.ObjectId, ref: "properties", index: true, unique: true}]
}, {timestamps: true, strict: false}));
