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

// Route: POST /api/v1/users/new
router.post("/new", User.createAccount);

// Route: PUT /api/v1/users/password
router.put("/password", protectUser, User.updatePassword);

// Route: PUT /api/v1/users/forgot
router.put("/forgot", User.forgotPassword);

// Route: PUT /api/v1/users/:id/user
router.put("/user", protectUser, User.editAccount);

// Route: PUT /api/v1/users/pic
router.put("/pic", protectUser, User.editAccountPic);

module.exports = router;