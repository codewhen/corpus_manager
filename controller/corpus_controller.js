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

exports.showUnassignedRow = async (req, res) => {
  try {
    const corpus = await CorpusModel.find({ assigned: null }).limit(50);
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

exports.assignUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.userId || !data.rowIds) {
      res.status(400).json({
        message: "userId or rowIds missing",
      });
    }
    for (const rowId of data.rowIds) {
      await CorpusModel.updateOne(
        { _id: rowId },
        { assigned: data.userId, assignedAt: Date.now() }
      );
    }
    res.status(200).json({
      message: `${data.rowIds.length} are assigned`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
