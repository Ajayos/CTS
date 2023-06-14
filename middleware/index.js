/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 12-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : index.js
 * @path : /middleware/index.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// 
const filename = "index.js";
const errorHandler = require("./errorHandler");
const authMiddleware = require("./authMiddleware");

module.exports = {
  errorHandler,
  authMiddleware,
};