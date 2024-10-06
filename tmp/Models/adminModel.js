/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : adminModel.js
 * @path : /Models/adminModel.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import the mongoose package
const mongoose = require("mongoose");

/**
 * Admin schema for managing admin data.
 */
const adminSchema = new mongoose.Schema({
  // Define the 'email' field with type String and it is required and should be unique
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Define the 'name' field with type String
  name: {
    type: String,
  },
  // Define the 'pic' field with type String and it is required
  pic: {
    type: String,
    required: true,
  },
  // Define the 'password' field with type String and it is required
  password: {
    type: String,
    required: true,
  },
  // Define the 'token' field as an array of objects
  token: [
    {
      // Define the 'id' field with type String
      id: String,
      // Define the 'token' field with type String
      token: String,
      // Define the 'created' field with type Date
      created: Date,
      // Define the 'device' field with type String
      device: String,
      // Define the 'lastLogin' field with type Date
      lastLogin: Date,
      // Define the 'status' field with type String and allowed values are ["active", "inactive"]
      status: {
        type: String,
        enum: ["active", "inactive"],
      },
    },
  ],
});

/**
 * Create an Admin model using the admin schema.
 *
 * @param {String} email - The email id of the admin. (required)
 * @param {String} name - The name of the admin.
 * @param {String} pic - The image of the admin. (required)
 * @param {String} password - The password of the admin. (required)
 * @param  {Array} token - An array of tokens associated with the user.
 * @param  {string} token.id - The token's ID.
 * @param  {string} token.token - The token string.
 * @param  {string} token.device - The device data.
 * @param  {Date} token.created - The date and time when the token was created.
 * @param  {Date} token.lastLogin - The date and time of the token's last login.
 * @param  {string} token.status - The token's status. Possible values: "active", "inactive".
 * @returns {Model} The Admin model.
 */
const Admins = mongoose.model("Admin", adminSchema);

// Export the Admin model
module.exports = Admins;