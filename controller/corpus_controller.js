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

exports.deleteRow = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "id is missing in param",
    });
  }
  const corpus = await CorpusModel.deleteOne({ _id: req.params.id });
  res.status(201).json(corpus);
};

exports.showAllRow = async (req, res) => {
  try {
    const corpus = await CorpusModel.find();
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", "bytes : 0-9/");
    res.status(200).json(corpus);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

exports.showUnassignedRow = async (req, res) => {
  try {
    //Aging// 5 days//
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 5);
    //End Aging//
    const corpus = await CorpusModel.find({
      $or: [{ assigned: null }, { assignedAt: { $lt: cutoff } }],
    }).limit(50);
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

exports.getAssignedRowsForCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    //Aging// 5 days//
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 5);
    //End Aging//
    const corpus = await CorpusModel.find({
      $and: [{ assigned: userId }, { assignedAt: { $gte: cutoff } }],
    }).limit(50);
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
