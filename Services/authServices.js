/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 12-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : authServices.js
 * @path : /Services/authServices.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

//importing
const filename = "authServices";
const { Admin, User } = require("../Models");
const isEqual = require("../lib/isEqual");
/**
 * Validates and protects a user's access based on provided data.
 * @param {Object} data - The data object containing user information.
 * @param {string} data.id - The user's ID.
 * @param {string} data.password - The user's password.
 * @returns {Object} - The result of the protection process.
 */
exports.protectUser = async (data) => {
  try {
    // Destructure the data object to get the required properties
    const { id, password } = data;

    // Find the user based on the decoded id
    const user = await User.findById(id);

    if (!user) {
      // User not found
      return {
        status: 404,
        message: "User not found!",
        error: true,
        data: undefined,
      };
    }

    if (isEqual(user.password, password)) {
      // Password doesn't match
      return {
        status: 401,
        message: "Not authorized, token failed!",
        error: true,
        data: undefined,
      };
    }

    if (!user.access) {
      // Access denied
      return {
        status: 403,
        message: "Access Denied!",
        error: true,
        data: undefined,
      };
    }

    if (user.delete) {
      // Account deleted
      return {
        status: 403,
        message: "Account Deleted!",
        error: true,
        data: undefined,
      };
    }

    // User access is valid
    return {
      status: 200,
      message: undefined,
      error: false,
      data: user,
    };
  } catch (error) {
    // Internal server error
    return {
      status: 500,
      error: true,
      message: "Internal server error",
      data: undefined,
    };
  }
};

/**
 * Validates and protects an admin's access based on provided data.
 * @param {Object} data - The data object containing admin information.
 * @param {string} data.id - The admin's ID.
 * @param {string} data.password - The admin's password.
 * @returns {Object} - The result of the protection process.
 */
exports.protectAdmin = async (data) => {
  try {
    // Destructure the data object to get the required properties
    const { id, password } = data;

    // Find the admin based on the decoded id
    const admin = await Admin.findById(id);

    if (!admin) {
      // Admin not found
      return {
        status: 404,
        message: "Admin not found!",
        error: true,
        data: undefined,
      };
    }

    if (isEqual(admin.password, password)) {
      // Password doesn't match
      return {
        status: 401,
        message: "Not authorized, token failed!",
        error: true,
        data: undefined,
      };
    }

    // Admin access is valid
    return {
      status: 200,
      message: undefined,
      error: false,
      data: admin,
    };
  } catch (error) {
    // Internal server error
    return {
      status: 500,
      error: true,
      message: "Internal server error",
      data: undefined,
    };
  }
};
