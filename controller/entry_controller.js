const CorpusModel = require("../models/corpusModel");
const LanguageModel = require("../models/languageModel");

exports.addEntrySimpleText = async (req, res) => {
  if (!req.body.language || !req.body.content) {
    return res.status(400).json({
      message: "language or content or corpusId is missing in body",
    });
  }
  try {
    const language = await LanguageModel.findOne({
      name: req.body.language.toLowerCase(),
    });
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
    }
    const corpusUpdate = await CorpusModel.updateOne(
      { _id: corpus._id },
      {
        $set: {
          [`entries.${language.name}`]: req.body.content,
        },
      }
    );
    corpus = await CorpusModel.findOne({ _id: corpus._id });
    res.status(201).json({
      corpus: corpus,
    });
  } catch (err) {
    console.debug(err);
    res.status(500).json({
      message: err,
    });
  }
};
