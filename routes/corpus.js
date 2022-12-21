var express = require("express");
const passport = require("passport");
var router = express.Router();
var CorpusController = require("../controller/corpus_controller");

/* GET users listing. */
router.post(
  "/addNewRow",
  passport.authenticate("jwt", { session: false }),
  CorpusController.addNewRow
);

module.exports = router;
