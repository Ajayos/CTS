import AdminService from '../services/admin';
import handleResponse from '../util/handleResponse';

const admin = new AdminService();
/**
 * Handles the login request.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const login = async (req: any, res: any) => {
	const result = await admin.login(req.body);
	handleResponse(Promise.resolve(result), res);
};

// /**
//    * Creates a new user account.
//    *
//    * @param req - The request object.
//    * @param res - The response object.
//    */
// export const createAccount = async (req: any, res: any) => {
// 	const result = await createService(req.body);
// 	handleResponse(Promise.resolve(result), res);
// };

/**
 * Retrieves the current user's information.
 * @param {any} req - The request object.
 * @param {any} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to the result of the meService function.
 */
export const me = async (req: any, res: any) => {
	const result = await admin.me(req.body);
	handleResponse(Promise.resolve(result), res);
};
