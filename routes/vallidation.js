var express = require("express");
const passport = require("passport");
var router = express.Router();
var ValidationController = require("../controller/validation_controller");
const { mustAdmin } = require("../middleware/auth/admin");

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  ValidationController.showRowDependingOnRole
);

router.get(
  "/all/admin",
  mustAdmin,
  passport.authenticate("jwt", { session: false }),
  ValidationController.showAllRow
);

router.get(
  "/all/user",
  mustAdmin,
  passport.authenticate("jwt", { session: false }),
  ValidationController.showUnassignedRow
);

router.get(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  ValidationController.showSingleRow
);

router.put(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  ValidationController.update
);

router.delete(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  ValidationController.deleteRow
);

router.get(
  "/showUnassignedRow",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  ValidationController.showUnassignedRow
);

router.put(
  "/assignUser/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  ValidationController.assignUser
);

router.get(
  "/assignUser/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  (req, res) => {
    res.status(200).json({ id: req.params.id });
  }
);

module.exports = router;
