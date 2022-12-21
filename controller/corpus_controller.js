const CorpusModel = require("../models/corpusModel");

exports.addNewRow = async (req, res) => {
  if (!req.body.sid) {
    return res.status(400).json({
      message: "sid is missing in body",
    });
  }
  const corpus = await CorpusModel.create({ sid: req.body.sid });
  res.status(201).json({
    corpus: corpus,
  });
};
