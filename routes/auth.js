var express = require("express");
const passport = require("passport");
var router = express.Router();
const { mustAdmin } = require("../middleware/auth/admin");
const AuthController = require("../controller/auth_controller");

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  AuthController.signup
);

router.post(
  "/set-role",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  AuthController.setRole
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  AuthController.showall
);

router.get(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  AuthController.showSingle
);

router.delete(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  AuthController.deleteUsers
);

router.put(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  AuthController.updateUser
);

router.get(
  "/role",
  passport.authenticate("jwt", { session: false }),
  AuthController.getUserRole
);

router.post("/login", AuthController.login);

module.exports = router;
