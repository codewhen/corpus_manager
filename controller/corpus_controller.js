const CorpusModel = require("../models/corpusModel");
const LanguageModel = require("../models/languageModel");

exports.create = async (req, res) => {
  if (!req.body.language || !req.body.content) {
    return res.status(400).json({
      message: "language or content or corpusId is missing in body",
    });
  }
  try {
    const language = await LanguageModel.findById(req.body.language);
    if (!language) {
      return res.status(400).json({
        message: "language not found",
      });
    }
    const corpus = await CorpusModel.create({
      $set: {
        [`entries.${language.name}`]: req.body.content,
      },
    });
    corpus = await CorpusModel.findOne({ _id: corpus._id });
    res.status(201).json(corpus);
  } catch (err) {
    console.debug(err);
    res.status(500).json({
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body.language || !req.body.content || !req.params.id) {
    return res.status(400).json({
      message: "language or content or corpusId is missing in body",
    });
  }
  try {
    const language = await LanguageModel.findById(req.body.language);
    if (!language) {
      return res.status(400).json({
        message: "language not found",
      });
    }
    let corpus = await CorpusModel.findOne({ _id: req.params.id });
    if (!corpus) {
      return res.status(400).json({
        message: "corpus not found",
      });
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
    res.status(201).json(corpus);
  } catch (err) {
    console.debug(err);
    res.status(500).json({
      message: err,
    });
  }
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

exports.showSingleRow = async (req, res) => {
  try {
    const corpus = await CorpusModel.findById(req.params.id);
    corpus.res.setHeader("Access-Control-Expose-Headers", "Content-Range");
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

    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", "bytes : 0-50/50");
    res.status(200).json(corpus);
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
    if (!data.userId || !req.params.id) {
      res.status(400).json({
        message: "userId or rowIds missing",
      });
    }
    await CorpusModel.updateOne(
      { _id: req.params.id },
      { assigned: data.userId, assignedAt: Date.now() }
    );
    const corpus = await CorpusModel.findById(req.params.id);
    res.status(200).json(corpus);
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
