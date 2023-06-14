/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : rootSocketRouter.js
 * @path : /Routes/rootSocketRouter.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const express = require("express");
const router = express.Router();

// Array to store users
const users = [];

// Socket.IO event handlers for root path
router.io("/", (socket, io) => {
  console.log("Connected to Socket.IO instance from root");

  // Store user ID on connection
  const userId = socket.id;
  users.push(userId);

  // Emit online users count
  io.emit("onlineUsers", users.length);

  // Handle events for root path

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO instance from root");

    // Remove user from users array
    const index = users.indexOf(userId);
    if (index > -1) {
      users.splice(index, 1);
    }

    // Emit online users count
    io.emit("onlineUsers", users.length);
  });
});

module.exports = router;
