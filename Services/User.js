/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 16-6-2023
 * @modified : 16-6-2023
 * @editor : Ajayos
 * @file : adminRouter.js
 * @path : /Routes/Router.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import dependencies
const { Admin, User } = require("../Models");
const bcrypt = require("bcryptjs");
const { encode } = require("../lib/JWT");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");

/**
 * User login function.
 *
 * @param {Object} data - User login data.
 * @param {string} data.email - Email address of the user.
 * @param {string} data.password - Password of the user.
 * @param {String} data.device - device of the user.
 * @returns {Object} Response indicating the status, error, message, and data of the login process.
 */
exports.login = async (data) => {
  try {
    // Destructure the data object to get the required properties
    const { email, password, device } = data;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        error: true,
        data: undefined,
      };
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isMatch) {
      return {
        status: 401,
        error: true,
        message: "Invalid credentials",
        data: undefined,
      };
    }

    // check access
    if (!user.access) {
      return {
        status: 403,
        error: true,
        message: "Access Denied",
        data: undefined,
      };
    }

    // account delete
    if (user.delete) {
      return {
        status: 204,
        error: true,
        message: "Account Deleted!",
        data: undefined,
      };
    }

    // Generate and return a token for authentication
    const token = encode(user);
    if (!token)
      return {
        status: 500,
        error: true,
        message: "Internal server error",
        data: undefined,
      };

    const tokenID = uuidv4();
    user.token.push({
      id: tokenID,
      token: token,
      lastLogin: Date.now(),
      created: Date.now(),
      device: device,
      status: "active",
    });
    await user.save();

    return {
      status: 200,
      error: false,
      message: undefined,
      data: { token, user },
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
      data: undefined,
    };
  }
};

/**
 * Create user account.
 *
 * @param {Object} data - User data for creating an account.
 * @param {string} data.email - Email address of the user.
 * @param {string} data.newPassword - New password for the user account.
 * @param {string} data.pic - Profile picture URL of the user.
 * @param {string} data.name - Name of the user.
 * @param {string} data.dob - Date of birth of the user.
 * @param {number} data.age - Age of the user.
 * @param {string} data.phoneNo - Phone number of the user.
 * @param {string} data.place - Place of residence of the user.
 * @param {string} data.education - Education details of the user.
 * @param {string} data.address - Address of the user.
 * @param {string} data.device - device data of the user.
 * @returns {Object} Response indicating the status, error, message, and data of the account creation process.
 */
exports.createAccount = async (data) => {
  try {
    // Destructure the data object to get the required properties
    const { email, password, pic, name, dob, age, phoneNo, place, device } =
      data;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: 409,
        error: true,
        message: "User already exists",
        data: undefined,
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user account
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      pic,
      dob,
      age,
      phoneNumber: phoneNo,
      place,
      access: true,
      created: Date.now(),
      status: "active",
    });

    await newUser.save();

    const user = await User.findOne({ email });
    // Generate and return a token for authentication
    const token = encode(user);
    if (!token)
      return {
        status: 500,
        error: true,
        message: "Internal server error",
        data: undefined,
      };

    const tokenID = uuidv4();
    user.token.push({
      id: tokenID,
      token: token,
      lastLogin: Date.now(),
      created: Date.now(),
      device: device,
      status: "active",
    });
    await user.save();

    return {
      status: 200,
      error: false,
      message: undefined,
      data: {
        token,
        user,
      },
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
      data: undefined,
    };
  }
};
