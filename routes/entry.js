var express = require("express");
const passport = require("passport");
var router = express.Router();
var EntryController = require("../controller/entry_controller");
const { mustAdmin } = require("../middleware/auth/admin");

/* GET users listing. */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  EntryController.addEntrySimpleText
);

module.exports = router;
