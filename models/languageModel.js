const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

LanguageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__id;
  },
});

const LanguageModel = mongoose.model("languages", LanguageSchema);

module.exports = LanguageModel;
