const mongoose = require("mongoose");

const { Schema } = mongoose;

const entrySchema = new Schema({
  entry: {
    type: String,
    requires: true,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storii: {
    type: Schema.Types.ObjectId,
    ref: "Storii",
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Entry", entrySchema);
