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
 * @path : /Routes/index.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import dependencies
const express = require('express');
const router = express.Router();

// Import individual router modules
const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');
//const socketRouter = require("./socketRouter");

// Set up routes
router.use('/api/v1/admins', adminRouter);
router.use('/api/v1/users', userRouter);
//router.use("/socket.io", socketRouter);

// Export router
module.exports = router;
