const mongoose = require("mongoose");

const { Schema } = mongoose;

const entrySchema = new Schema({
  content: {
    type: String,
    requires: true,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storiiId: {
    type: Schema.Types.ObjectId,
    ref: "Storii",
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Entry", entrySchema);
