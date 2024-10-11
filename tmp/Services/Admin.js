/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 15-6-2023
 * @modified : 16-6-2023
 * @editor : Ajayos
 * @file : Admin.js
 * @path : /Services/Admin.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import dependencies
const { Admin, User } = require('../Models');
const bcrypt = require('bcryptjs');
const { encode } = require('../lib/JWT');
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongodb');

/**
 * admin login
 *
 * @param {Object} data - Data for admin login.
 * @param {String} data.email - email of the admin.
 * @param {String} data.password - password of the admin.
 * @param {String} data.device - device of the admin.
 * @returns {Object} Response indicating the status, error, message, and data of the process.
 */
exports.login = async data => {
	try {
		// Destructure the data object to get the required properties
		const { email, password, device } = data;

		// Find the Admin by email
		const admin = await Admin.findOne({ email });

		// If admin not found, return error
		if (!admin) {
			return {
				status: 404,
				message: 'admin not found',
				error: true,
				data: undefined,
			};
		}

		// Compare the provided password with the hashed password in the database
		const isMatch = await bcrypt.compare(password, admin.password);
		// If passwords don't match, return error
		if (!isMatch) {
			return {
				status: 401,
				error: true,
				message: 'Invalid credentials',
				data: undefined,
			};
		}

		// Generate and return a token for authentication
		const token = encode(admin);
		if (!token)
			return {
				status: 500,
				error: true,
				message: 'Internal server error',
				data: undefined,
			};

		const tokenID = uuidv4();
		admin.token.push({
			id: tokenID,
			token: token,
			lastLogin: Date.now(),
			created: Date.now(),
			device: device,
			status: 'active',
		});
		await admin.save();

		return {
			status: 200,
			error: false,
			message: undefined,
			data: { token, admin },
		};
	} catch (error) {
		return {
			status: 500,
			error: true,
			message: 'Internal server error',
			data: undefined,
		};
	}
};

/**
 * admin create
 *
 * @param {Object} data - Data for approve a request.
 * @param {String} data.email - email of the admin.
 * @param {String} data.password = password of the admin.
 * @param {String} data.pic - pic of the admin.
 * @param {String} data.device - device information of the user
 * @returns {Object} Response indicating the status, error, message, and data of the process.
 */
exports.createAccount = async data => {
	try {
		// Destructure the data object to get the required properties
		const { email, password, pic, name, device } = data;

		// Check if the Admin already exists
		const existingAdmin = await Admin.findOne({ email });
		if (existingAdmin) {
			return {
				status: 409,
				error: true,
				message: 'Admin already exists',
				data: undefined,
			};
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user account
		const newAdmin = new Admin({
			email,
			password: hashedPassword,
			name,
			pic,
		});
		await newAdmin.save();

		const admin_ = await Admin.findOne({ email });

		// Generate and return a token for authentication
		const token = encode(admin_);
		if (!token)
			return {
				status: 500,
				error: true,
				message: 'Internal server error',
				data: undefined,
			};

		const tokenID = uuidv4();
		admin_.token.push({
			id: tokenID,
			token: token,
			lastLogin: Date.now(),
			created: Date.now(),
			device: device,
			status: 'active',
		});
		await admin_.save();
		return {
			status: 201,
			error: false,
			message: undefined,
			data: {
				token,
				name,
				email,
				pic,
			},
		};
	} catch (error) {
		return {
			status: 500,
			error: true,
			message: 'Internal server error',
			data: undefined,
		};
	}
};
