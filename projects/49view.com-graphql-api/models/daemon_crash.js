const mongoose = global.db;

export const daemonCrashModel = mongoose.model("daemon_crashes", new mongoose.Schema({
  crash: {type: String},
  username: {type: String},
}, {timestamps: true, strict: false}));
