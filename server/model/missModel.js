const mongoose = require("mongoose");

const inputSchema = mongoose.Schema({
  todo: {
    type: "String",
    require: true,
  },
  mark: {
    type: "Boolean",
    default: false,
  },
});

// for progress
const progressSchema = mongoose.Schema({
  taskDesc: {
    type: "String",
    require: true,
  },
  tags: {
    type: [String],
  },
  category: {
    type: String,
    default: "todo",
  },
});

const inputModel = mongoose.model("MissTask", inputSchema);
const progressModel = mongoose.model("MissProgress", progressSchema);

module.exports = { inputModel, progressModel };
