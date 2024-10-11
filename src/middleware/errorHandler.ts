import { Request, Response, NextFunction } from 'express';

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Determine the status code based on the current response status
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	// Set the response status code
	res.status(statusCode);

	// Send a JSON response with the error message and details
	res.json({
		error: true,
		message: 'Internal Server Error',
		data: null,
		status: statusCode,
	});
};

export default errorHandler;
