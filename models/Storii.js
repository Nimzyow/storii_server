const mongoose = require("mongoose");

const { Schema } = mongoose;

const storiiSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  mainGenre: {
    type: String,
    required: true,
  },
  tags: [
    { type: String },
  ],
  entries: [
    { type: Schema.Types.ObjectId, ref: "Entry" },
  ],
  writers: [
    { type: Schema.Types.ObjectId, ref: "User" },
  ],
  pendingInvitees: [
    { type: Schema.Types.ObjectId, ref: "User" },
  ],
  public: {
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Storii", storiiSchema);
