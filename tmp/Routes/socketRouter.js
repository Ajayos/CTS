/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : socketRouter.js
 * @path : /Routes/socketRouter.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// import
const express = require('express');
const router = express.Router();

// Import Socket.IO route handlers
const rootSocket = require('./rootSocketRouter');
const onlineChatSocket = require('./online-chat');

// Define Socket.IO route paths
router.use('/', rootSocket);
router.use('/online/chat', onlineChatSocket);

module.exports = router;
