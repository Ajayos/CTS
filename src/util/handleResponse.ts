import { saveLog } from '../lib/Logger';
import { Response } from 'express';

/**
 * Handles the response from a promise and sends it as a JSON response.
 *
 * @param promise - The promise to handle the response from.
 * @param res - The response object to send the JSON response to.
 * @returns A JSON response based on the output of the promise.
 *
 * @example
 * // Assuming `promise` is a promise that resolves to an object with `status` and `error` properties
 * const response = await handleResponse(promise, res);
 * // The response will be sent as a JSON response to the `res` object.
 */
const handleResponse = async (promise: Promise<any>, res: Response) => {
	try {
		const output = await promise;
		const { status, error } = output;

		if (error) {
			saveLog(
				`src/util/handleResponse:handleResponse() => ${output.message} `,
				'e',
			);
			return res.status(status).json(output);
		}

		return res.status(status).json(output);
	} catch (error: any) {
		saveLog(
			`src/util/handleResponse:handleResponse(e) => ${JSON.stringify(error)} || ${error}`,
			'e',
		);
		return res.status(500).json({
			status: 500,
			error: true,
			message: 'Internal server error',
			data: error.message || null,
		});
	}
};

export default handleResponse;
