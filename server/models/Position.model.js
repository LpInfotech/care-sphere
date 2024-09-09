const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: undefined,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

const Position =
  mongoose.models.Position || mongoose.model("Position", positionSchema);

module.exports = Position;
