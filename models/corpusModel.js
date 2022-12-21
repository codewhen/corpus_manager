const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CorpusSchema = new Schema({
  entries: {
    type: Map,
    of: String,
  },
});

const CorpusModel = mongoose.model("corpus", CorpusSchema);

module.exports = CorpusModel;
