var express = require("express");
const passport = require("passport");
var router = express.Router();
var CorpusController = require("../controller/corpus_controller");

router.post(
  "/addNewRow",
  passport.authenticate("jwt", { session: false }),
  CorpusController.addNewRow
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  CorpusController.showAllRow
);

module.exports = router;
