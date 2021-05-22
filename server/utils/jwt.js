const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const getToken = (data) => {
  const { isAdmin, _id: id } = data;
  return jwt.sign({ isAdmin, id }, jwtSecret, { expiresIn: "7d" });
};

const isLoggedIn = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, jwtSecret);
    next();
  } catch {
    res.status(400).json({
      success: false,
      authError: true,
      msg: "auth errors pleace login again",
    });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, jwtSecret);
    const { isAdmin } = jwt.decode(req.headers.authorization);

    if (isAdmin === true) {
      next();
    } else {
      res.status(400).json({
        success: false,
        authError: true,
        msg: "auth errors pleace login again",
      });
    }
  } catch {
    res.status(400).json({
      success: false,
      authError: true,
      msg: "auth errors pleace login again",
    });
  }
};

module.exports = { getToken, isLoggedIn, checkAdmin };
