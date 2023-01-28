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
    entriesValid: {
      type: Map,
      of: String,
    },
    assignedValid: {
      type: mongoose.Types.ObjectId,
    },
    assignedAtValid: {
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

CorpusSchema.virtual("isAssigned").get(function () {
  //Aging// 5 days//
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 5);
  //End Aging//
  return this.assigned != null && this.assigned && this.assignedAt > cutoff;
});

CorpusSchema.virtual("isAssignedValid").get(function () {
  //Aging// 5 days//
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 5);
  //End Aging//
  return (
    this.assignedValid != null &&
    this.assignedValid &&
    this.assignedAtValid > cutoff
  );
});

const CorpusModel = mongoose.model("corpus", CorpusSchema);

module.exports = CorpusModel;
