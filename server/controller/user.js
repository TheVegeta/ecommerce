const bcrypt = require("bcrypt");
const User = require("../models/user");
const { getToken } = require("../utils/jwt");

const registerController = async (req, res) => {
  const { name, email, password } = req.body.payload;
  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({ name, email, hash, isAdmin: false });
  await newUser
    .save()
    .then(() =>
      res.json({
        success: true,
        user: { name, email },
        token: getToken(newUser),
      })
    )
    .catch(() =>
      res.status(400).json({ success: false, msg: "email alrady exist" })
    );
};

const loginController = async (req, res) => {
  const { email, password } = req.body.payload;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      const isPassword = await bcrypt.compare(password, findUser.hash);
      if (isPassword) {
        res.json({
          success: true,
          user: { name: findUser.name, email },
          token: getToken(findUser),
        });
      } else {
        throw "password is wrong";
      }
    } else {
      throw "can't find user";
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: "plz check your email or password" });
  }
};

module.exports = { registerController, loginController };
