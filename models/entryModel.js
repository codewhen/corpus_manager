const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  language: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    unique: true,
    required: true,
  },
  // sid: {
  //   type: String,
  //   required: true,
  // },
  corpusId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const EntryModel = mongoose.model("entries", EntrySchema);

module.exports = EntryModel;
