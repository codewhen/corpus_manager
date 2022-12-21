const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CorpusSchema = new Schema({
  sid: {
    type: String,
    // required: true,
    // unique: true,
  },
  entries: {
    type: [mongoose.Types.ObjectId],
  },
});

const CorpusModel = mongoose.model("corpus", CorpusSchema);

module.exports = CorpusModel;
