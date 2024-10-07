import Application from '../services/application';
import handleResponse from '../util/handleResponse';

const app = new Application();
/**
 * Handles the login request.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const getWebHooks = async (req: any, res: any) => {
	const result = await app.getWebHooks();
	handleResponse(Promise.resolve(result), res);
};

export const getWebHookConfig = async (req: any, res: any) => {
	const result = await app.getWebHookConfig();
	handleResponse(Promise.resolve(result), res);
};

export const updateWebHookConfig = async (req: any, res: any) => {
	const result = await app.updateWebHookConfig(req.body);
	handleResponse(Promise.resolve(result), res);
};

export const updateStatus = async (req: any, res: any) => {
	const result = await app.updateStatus(req.body);
	handleResponse(Promise.resolve(result), res);
};

export const deleteConfig = async (req: any, res: any) => {
	const result = await app.deleteConfig(req.body);
	handleResponse(Promise.resolve(result), res);
};

export const addConfig = async (req: any, res: any) => {
	const result = await app.addConfig(req.body);
	handleResponse(Promise.resolve(result), res);
};
