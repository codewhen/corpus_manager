const LanguageModel = require("../models/languageModel");

exports.addLanguage = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "language name is missing in body",
    });
  }

  try {
    const language = await LanguageModel.create({
      name: req.body.name.toLowerCase(),
    });
    res.status(201).json(language);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.allLanguage = async (req, res) => {
  try {
    const language = await LanguageModel.find();
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", "language : 0-9/*");
    res.status(200).json(language);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "id is missing in param",
      });
    }
    const language = await LanguageModel.deleteOne({ _id: req.params.id });
    res.status(200).json(language);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};
