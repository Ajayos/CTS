import { saveLog, log } from '../lib/Logger';
import DB from '../lib/DB';
import { v4 as uuidv4 } from 'uuid';

/**
 * Saves the webhook response to the database.
 *
 * @param path - The path of the webhook.
 * @param name - The name of the webhook.
 * @param body - The JSON body of the webhook.
 * @param response - The JSON response of the webhook.
 * @returns A promise that resolves to a boolean indicating whether the response was successfully saved.
 */
export async function saveWebHookResponse(
	path: string,
	name: string,
	body: object,
	response: any = [],
): Promise<boolean> {
	try {
		return new Promise(async (resolve, reject) => {
			const uuid = uuidv4();
			const date = new Date();
			const dateTime = date.toLocaleString('en-US', {
				timeZone: 'Asia/Kolkata',
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
			});
			var status = 'success';

			if (response.length > 0) {
				for (const res of response) {
					if (res.status === 'error') {
						status = 'error';
						break;
					}
				}
			}
			const week = new Date().getDay() + 1 || 0;
			const query = `INSERT INTO ajayos.webhook_response (uuid, path_webhook, name, time, body, week, response, status) VALUES ('${uuid}', '${path}', '${name}', '${dateTime}', '${JSON.stringify(body)}', '${week}', '${JSON.stringify(response)}', '${status}')`;
			await DB.query(query)
				.then((results: any) => {
					resolve(true);
				})
				.catch((error: any) => {
					log(error, 'error');
					saveLog(
						`Sql/WebHook.saveWebHookResponse().Promise.query(e) => Error saving webhook response ${JSON.stringify(error)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error: any) {
		log(
			`Sql/WebHook.saveWebHookResponse(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		saveLog(
			`Sql/WebHook.saveWebHookResponse(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return false;
	}
}

/**
 * Retrieves the webhook response from the database.
 * @param path - The path of the webhook. If not provided, all webhook responses are returned.
 * @returns {Promise<any>} A promise that resolves with the webhook response.
 */
export async function getWebHookResponse(path?: string): Promise<any> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = path
				? `SELECT * FROM ajayos.webhook_response WHERE path_webhook = '${path}'`
				: `SELECT * FROM ajayos.webhook_response`;
			await DB.query(query)
				.then((results: any) => {
					resolve(results);
				})
				.catch((error: any) => {
					log(error, 'error');
					saveLog(
						`Sql/WebHook.getWebHookResponse().Promise.query(e) => Error getting webhook response ${JSON.stringify(error)} || ${error}`,
						'error',
					);
					resolve([]);
				});
		});
	} catch (error: any) {
		log(
			`Sql/WebHook.getWebHookResponse(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		saveLog(
			`Sql/WebHook.getWebHookResponse(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return [];
	}
}

/**
 * Retrieves webhook information from the database.
 *
 * @param path - Optional path to filter the webhook information.
 * @returns A promise that resolves to an array of webhook information.
 */
export async function getWebHookInfo(path?: string): Promise<any> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = path
				? `SELECT * FROM ajayos.webhook_info WHERE path_webhook = '${path}'`
				: `SELECT * FROM ajayos.webhook_info`;
			await DB.query(query)
				.then((results: any) => {
					resolve(results.rows);
				})
				.catch((error: any) => {
					log(error, 'error');
					saveLog(
						`Sql/WebHook.getWebHookInfo().Promise.query(e) => Error getting webhook info ${JSON.stringify(error)} || ${error}`,
						'error',
					);
					resolve([]);
				});
		});
	} catch (error: any) {
		log(
			`Sql/WebHook.getWebHookInfo(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		saveLog(
			`Sql/WebHook.getWebHookInfo(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return [];
	}
}

/**
 * Saves the webhook information to the database.
 *
 * @param path_webhook - The path of the webhook.
 * @param status - The status of the webhook.
 * @param webhooks - The JSON object containing the webhook data.
 * @returns A promise that resolves to a boolean indicating whether the webhook information was successfully saved.
 */
export async function saveWebHookInfo(
	path_webhook: string,
	status: boolean,
	webhooks: JSON,
) {
	try {
		return new Promise(async (resolve, reject) => {
			const query = `INSERT INTO ajayos.webhook_info (path_webhook, status, webhooks) VALUES ('${path_webhook}', ${status}, '${JSON.stringify(webhooks)}') ON DUPLICATE KEY UPDATE status = VALUES(status), webhooks = VALUES(webhooks)`;
			await DB.query(query)
				.then((results: any) => {
					resolve(true);
				})
				.catch((error: any) => {
					log(error, 'error');
					saveLog(
						`Sql/WebHook.saveWebHookInfo().Promise.query(e) => Error saving webhook info ${JSON.stringify(error)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error: any) {
		log(
			`Sql/WebHook.saveWebHookInfo(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		saveLog(
			`Sql/WebHook.saveWebHookInfo(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return false;
	}
}
