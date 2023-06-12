/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 12-6-2023
 * @modified : 12-6-2023
 * @editor : Ajayos
 * @file : authMiddleware.js
 * @path : /middleware/authMiddleware.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const asyncHandler = require("express-async-handler");
const { protectUser, protectAdmin } = require("../Services/authServices");
const { decode } = require("../lib/JWT");
// Authentication middleware for users
const protectUser = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user id, email, and hashed password

      const { id, email, hashedPassword } = await decode(token);

      const { status, message, error, data } = await protectUser(
        id,
        hashedPassword
      );

      if (error) {
        return res.status(status).json({ error: true, message: message });
      } else {
        next();
      }
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      message: "Not authorized, no token",
    });
  }
});

// Authentication middleware for admins
const protectAdmin = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user id, email, and hashed password
      const { id, email, hashedPassword } = await decode(token);

      const { status, message, error, data } = await protectAdmin(
        id,
        hashedPassword
      );

      if (error) {
        return res.status(status).json({ error: true, message: message });
      } else {
        next();
      }
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      message: "Not authorized, no token",
    });
  }
});

module.exports = {
  protectUser,
  protectAdmin,
};
