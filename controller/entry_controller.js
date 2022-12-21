const CorpusModel = require("../models/corpusModel");
const EntryModel = require("../models/entryModel");
const LanguageModel = require("../models/languageModel");

exports.addEntrySimpleText = async (req, res) => {
  if (!req.body.language || !req.body.content) {
    return res.status(400).json({
      message: "language or content or corpusId is missing in body",
    });
  }
  try {
    const language = await LanguageModel.findOne({ name: req.body.language });
    if (!language) {
      return res.status(400).json({
        message: "language not found",
      });
    }
    let corpus;
    if (req.body.corpusId) {
      corpus = await CorpusModel.findOne({ _id: req.body.corpusId });
      if (!corpus) {
        return res.status(400).json({
          message: "corpus not found",
        });
      }
    } else {
      corpus = await CorpusModel.create({});
      console.log(corpus);
    }
    const entry = await EntryModel.create({
      language: language._id,
      content: req.body.content,
      corpusId: corpus._id,
    });
    const corpusUpdate = await CorpusModel.updateOne(
      { _id: corpus._id },
      { $push: { entries: entry._id } }
    );
    res.status(201).json({
      entry: entry,
    });
  } catch (err) {
    console.debug(err);
    res.status(500).json({
      message: err,
    });
  }
};
