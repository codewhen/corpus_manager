var express = require("express");
const passport = require("passport");
var router = express.Router();
var CorpusController = require("../controller/corpus_controller");
const { mustAdmin } = require("../middleware/auth/admin");

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

router.get(
  "/showUnassignedRow",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  CorpusController.showUnassignedRow
);

router.post(
  "/assignUser",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  CorpusController.assignUser
);

module.exports = router;
