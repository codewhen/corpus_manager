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
    res.status(201).json({
      language: language,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};
