const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const LanguageModel = mongoose.model("languages", LanguageSchema);

module.exports = LanguageModel;
