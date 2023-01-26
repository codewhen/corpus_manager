var express = require("express");
const passport = require("passport");
var router = express.Router();
var CorpusController = require("../controller/corpus_controller");
const { mustAdmin } = require("../middleware/auth/admin");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  CorpusController.create
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  CorpusController.showAllRow
);

router.get(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  CorpusController.showSingleRow
);

router.put(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  CorpusController.update
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

router.put(
  "/assignUser/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  CorpusController.assignUser
);

router.get(
  "/assignUser/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  (req, res) => {
    res.status(200).json({ id: req.params.id });
  }
);

router.get(
  "/getAssignedRowsForCurrentUser",
  passport.authenticate("jwt", { session: false }),
  CorpusController.getAssignedRowsForCurrentUser
);

module.exports = router;
