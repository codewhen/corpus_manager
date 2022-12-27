const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CorpusSchema = new Schema(
  {
    entries: {
      type: Map,
      of: String,
    },
    assigned: {
      type: mongoose.Types.ObjectId,
    },
    assignedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const CorpusModel = mongoose.model("corpus", CorpusSchema);

module.exports = CorpusModel;
