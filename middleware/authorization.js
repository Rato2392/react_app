const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.header("jwt_token");
  if (!token) {
    return res.status(403).json("not authorized");
  }
  try {
    const payload = jwt.verify(token, process.env.jwtSecret);

    req.users = payload.users;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("not authorized 2");
  }
};
