/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : userModel.js
 * @path : /Models/userModel.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import the mongoose package
const mongoose = require("mongoose");

/**
 * User schema for managing user data.
 */
const userSchema = new mongoose.Schema(
  {
    // Define the 'password' field with type String and it is required
    password: {
      type: String,
      required: true,
    },
    // Define the 'name' field with type String and it is required
    name: {
      type: String,
      required: true,
    },
    // Define the 'phoneNumber' field with type String and it is required, and should be unique
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    // Define the 'dob' field with type Date and it is required
    dob: {
      type: String,
      required: true,
    },
    // Define the 'pic' field with type String and it is required
    pic: {
      type: String,
      required: true,
    },
    // Define the 'place' field with type String and it is required
    place: {
      type: String,
      required: true,
    },
    // Define the 'age' field with type Number and it is required
    age: {
      type: Number,
      required: true,
    },
    // Define the 'email' field with type String, it is required, and should be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Define the 'access' field with type Boolean and it is required, default value is true
    access: {
      type: Boolean,
      default: true,
    },
    // Define the 'delete' field with type Boolean and it is required, default value is false
    delete: {
      type: Boolean,
      default: false,
    },
    // Define the 'created' field with type Date
    created: {
      type: Date,
    },
    // Define the 'status' field with type String and allowed values are ["active", "inactive", "blocked", "deleted"]
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "deleted"],
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
    // Define the 'updated' field with type Date and default value Date.now
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Define the timestamps option to automatically generate 'created' and 'updated' fields
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

/**
 * Represents a user schema in the application.
 *
 * @param  {string} password - The user's password.
 * @param  {string} name - The user's name.
 * @param  {string} phoneNumber - The user's phone number. Should be unique.
 * @param  {string} dob - The user's date of birth.
 * @param  {string} pic - The user's profile picture.
 * @param  {string} place - The user's place of residence.
 * @param  {number} age - The user's age.
 * @param  {string} email - The user's email address. Should be unique.
 * @param  {boolean} access - The user's access status. Default is true.
 * @param  {boolean} delete - The user's delete status. Default is false.
 * @param  {Date} created - The date and time when the user was created.
 * @param  {string} status - The user's status. Possible values: "active", "inactive", "blocked", "deleted".
 * @param  {Array} token - An array of tokens associated with the user.
 * @param  {string} token.id - The token's ID.
 * @param  {string} token.token - The token string.
 * @param  {string} token.device - The device data.
 * @param  {Date} token.created - The date and time when the token was created.
 * @param  {Date} token.lastLogin - The date and time of the token's last login.
 * @param  {string} token.status - The token's status. Possible values: "active", "inactive".
 * @param  {Date} updated - The date and time when the user was last updated.
 *
 * @class UserSchema
 * @returns {Model} The User model.
 */
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;