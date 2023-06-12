/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 12-6-2023
 * @modified : 12-6-2023
 * @editor : Ajayos
 * @file : JWT.js
 * @path : /lib/JWT.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const jwt = require("jsonwebtoken");

const encode = (data) => {
  if (!(data._id | data.id) && !data.email && !data.password) return false;
  const payload = {
    id: data._id || data.id,
    email: data.email,
    hashedPassword: data.password,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1w", // 1 week expiration
  });

  return token;
};

const decode = (token) => {
  if (!token) return false;
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    encode,
    decode
}