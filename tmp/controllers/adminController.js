/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 15-6-2023
 * @modified : 15-6-2023
 * @editor : Ajayos
 * @file : adminController.js
 * @path : /controllers/adminController.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const asyncHandler = require("express-async-handler");
const Admin = require("../Services/Admin");
const User = require("../Services/User");

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */

exports.login = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await Admin.login(req.body);

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */
exports.createAccount = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await Admin.createAccount(
			req.body
		);

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */
exports.editAccount = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.editAccount({
			id: req.body.id,
			name: req.body.name,
			dob: req.body.dob,
			age: req.body.age,
			place: req.body.place,
		});

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */

exports.editAccountPic = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.editAccountPic({
			id : req.body.id,
			pic: req.body.pic,
		});

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */

exports.updateUserAccess = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.editAccess({
			id: req.body.id,
			access: req.body.access,
		});

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */

exports.deleteAccount = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.deleteAccount({
			id: req.params.id,
		});

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});

/**
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response containing the output.
 * @throws {Object} Error object if an error occurs during the process.
 */

exports.dashBoard = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await Admin.dashBoard();

		if (error) {
			return res.status(status).json({ error: true, message });
		}

		return res.status(status).json(data);
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: "Internal server error" });
	}
});
