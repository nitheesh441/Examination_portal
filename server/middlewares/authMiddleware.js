const User = require("../models/Login.js");

const jwt = require("jsonwebtoken");

export const requireSignIn = async (req, res, next) => {
  if (req?.cookies?.access_token) {
    const token = await req.cookies.access_token;
    if (!token)
      return res.status(401).send({
        success: false,
        message: "Unautorized: Token not provided!",
      });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(403).send({
          success: false,
          message: "Forbidden",
        });

      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "Unautorized: Token not provided!",
    });
  }
};

//Admin access

