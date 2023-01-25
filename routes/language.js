var express = require("express");
const passport = require("passport");
var router = express.Router();
var LanguageController = require("../controller/language_controller");
const { mustAdmin } = require("../middleware/auth/admin");

/* GET users listing. */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  LanguageController.addLanguage
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  LanguageController.allLanguage
);

router.delete(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  LanguageController.deleteLanguage
);

module.exports = router;
