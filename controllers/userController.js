/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 25-6-2023
 * @modified : 25-6-2023
 * @editor : Ajayos
 * @file : userController.js
 * @path : /controllers/userController.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

const asyncHandler = require("express-async-handler");
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
		const { status, message, error, data } = await User.login(req.body);

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
		const { status, message, error, data } = await User.createAccount(req.body);

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
exports.updatePassword = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.updatePassword({
			id: req.id,
			password: req.body.password,
			device: req.body.device,
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
exports.forgotPassword = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.forgotPassword({
			email: req.body.email,
			dob: req.body.dob,
			password: req.body.password,
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
exports.editAccount = asyncHandler(async (req, res) => {
	try {
		const { status, message, error, data } = await User.editAccount({
			id: req.id,
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
			id: req.id,
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