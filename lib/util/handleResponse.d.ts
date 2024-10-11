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
declare const handleResponse: (promise: Promise<any>, res: Response) => Promise<Response<any, Record<string, any>>>;
export default handleResponse;
