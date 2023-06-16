/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 16-6-2023
 * @editor : Ajayos
 * @file : userRouter.js
 * @path : /Routes/userRouter.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const { protectUser } = require("../middleware/authMiddleware");

// Route: POST /api/v1/users
router.post("/", User.login);

// Route: POST /api/v1/users/admin
router.post("/admin", User.createAccount);

module.exports = router;