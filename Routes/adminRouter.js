/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 16-6-2023
 * @editor : Ajayos
 * @file : adminRouter.js
 * @path : /Routes/adminRouter.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const express = require("express");
const router = express.Router();
const Admin = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Route: POST /api/v1/admins
router.post("/", Admin.login);

// Route: POST /api/v1/admins/new
router.post("/new", Admin.createAccount);

// Route: PUT /api/v1/admins/user/edit
router.put("/user/edit", protectAdmin, User.editAccount);

// Route: PUT /api/v1/admins/user/pic
router.put("/user/pic", protectAdmin, User.editAccountPic);

// Route: PUT /api/v1/admins/user/access
router.put("/user/access", protectAdmin, User.updateUserAccess);

// Route: PUT /api/v1/admins/user
router.delete("/user", protectAdmin, User.deleteAccount);

module.exports = router;