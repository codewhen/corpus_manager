const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token, user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.showall = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", "bytes : 0-9/");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

exports.showSingle = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    user.password = "";
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const data = req.body;

    const user = await UserModel.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    });

    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, "TOP_SECRET");

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    if (req.user._id === req.params.id) {
      return res.status(400).json({
        message: "cannot delete your own account",
      });
    }
    const user = await UserModel.deleteOne({ _id: req.params.id });

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.updateOne(
      { _id: req.params.id },
      {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      }
    );

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

exports.setRole = async (req, res, next) => {
  const data = req.body;
  if (!data.id || !data.role) {
    return res.status(400).json({
      message: "id or role is not mentioned",
    });
  }

  const user = await UserModel.updateOne(
    {
      _id: data.id,
    },
    {
      role: data.role,
    }
  );

  res.status(201).json({
    message: "Role update successful",
    user: user,
  });
};

exports.getUserRole = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not found" });
    }
    const user = await UserModel.findById(req.user._id);
    res.status(200).json({ role: user.role });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};
