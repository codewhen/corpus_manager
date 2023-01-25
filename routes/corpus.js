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

router.delete(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  CorpusController.deleteRow
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

router.get(
  "/getAssignedRowsForCurrentUser",
  passport.authenticate("jwt", { session: false }),
  CorpusController.getAssignedRowsForCurrentUser
);

module.exports = router;
