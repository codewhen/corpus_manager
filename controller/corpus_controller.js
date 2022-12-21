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

exports.showAllRow = async (req, res) => {
  try {
    const corpus = await CorpusModel.find();
    res.status(200).json({
      corpus: corpus,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
