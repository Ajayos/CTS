/**
 * JWT Utility for encoding and decoding JWT tokens.
 *
 * @project: CTS
 * @version: 12.5.3
 * @link: https://github.com/Ajayos/CTS
 * @author: Ajay O.S
 * @created: 12-6-2023
 * @modified: 14-6-2023
 * @editor: Ajayos
 * @file: JWT.js
 * @path: /lib/JWT.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */


const jwt = require("jsonwebtoken");

/**
 * Encodes data into a JWT token.
 * @param {Object} data - The data to be encoded.
 * @returns {string|boolean} - The encoded JWT token or false if encoding fails.
 */
const encode = (data) => {
  if (!(data._id || data.id) && !data.email && !data.password) return false;

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

/**
 * Decodes a JWT token.
 * @param {string} token - The JWT token to be decoded.
 * @returns {Object|boolean} - The decoded data or false if decoding fails.
 */
const decode = (token) => {
  if (!token) return false;

  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Checks if a JWT token is valid and not expired.
 * @param {string} token - The JWT token to be validated.
 * @returns {boolean} - True if the token is valid and not expired, false otherwise.
 */
const isValid = (token) => {
  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  encode,
  decode,
  isTokenValid,
};
