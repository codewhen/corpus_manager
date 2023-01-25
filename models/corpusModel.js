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

CorpusSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__id;
  },
});

const CorpusModel = mongoose.model("corpus", CorpusSchema);

module.exports = CorpusModel;
