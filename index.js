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
 * @path : index.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import dependencies
const os = require("os");
const fs = require("fs");
const path = require("path");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const { log } = require("@ajayos/nodelogger");

// Import local modules
const setupLogger = require("./lib/Logger");
const apiRouter = require("./Routers");
const { connectDB } = require("./Models");
const { errorHandler } = require("./middleware/");

// config env file
dotenv.config();

// Define
const SERVER_PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "/Public");

// Set up the logger
setupLogger();

// connect to Database
connectDB();

// on UNCAUGHT error
process.on("uncaughtException", (err) => {
	log(err);
	log("UNCAUGHT Exception! Shutting down ...", "e");
	process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
  });

// Create Express app
const app = express();
const server = http.createServer(app);

// Setup app for the data handling
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup api
// v1 api
app.use("/", apiRouter);
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Error handler middleware
app.use(errorHandler);

// Start the server
server.listen(SERVER_PORT, () => {
  log(`Server running on port ${SERVER_PORT}`, "i");
  log(`Server is running at http://127.0.0.1:${SERVER_PORT}`, "i");
  log(`Open above url to view the app :)`, "i");
});
