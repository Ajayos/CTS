// const asyncHandler = require('express-async-handler');
// const { protectUser, protectAdmin } = require('../Services/authServices');
// const { decode } = require('../lib/JWT');

import expressAsyncHandler from 'express-async-handler';

const userFinder = expressAsyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			next();
		} catch (error) {
			res.status(401).json({
				error: true,
				message: 'Not authorized, token failed',
			});
			return;
		}
	} else {
		next();
	}
});

export default userFinder;
