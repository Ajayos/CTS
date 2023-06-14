/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : index.js
 * @path : /Models/index.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import the necessary models and schemas
const connectDB = require("./Database");
const Admin = require("./adminModel");
const User = require("./userModel");

// Export the models and schemas
module.exports = {
	connectDB, // Function to connect to the database
	Admin, // Admin model for managing admin data
	User, // User model for managing user data
};