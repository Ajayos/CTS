import axios from 'axios';
import { log, saveLog } from '../lib/Logger';
import { getWebHookInfo, saveWebHookResponse } from '../Sql/webHook';

/**
 * Manages the webhook.
 *
 * @param path - The path of the webhook.
 * @param request - The request object.
 * @returns A promise that resolves to void.
 */
export async function manageWebHook(
	path: string,
	request: any,
): Promise<boolean> {
	try {
		return new Promise(async (resolve, reject) => {
			const { query, body } = request;
			const response = { query, body };
			const res = await getWebHookInfo(path);
			var save_response: any[] = [];
			if (res.length > 0) {
				const { status, webhooks } = res[0];
				if (status === 1) {
					const api_webhooks = JSON.parse(webhooks);
					const api_webhook = api_webhooks.webhook;
					for (const webhook of api_webhook) {
						const { status, url, name } = webhook;
						if (status === false || !status) continue;
						const call_api = await callApi(url, response);
						save_response.push({
							name,
							url,
							status: call_api.status,
							response: call_api.response,
						});
					}
				}
			}
			await saveWebHookResponse(
				path,
				path.replace(/[\/\\]/g, ' ').trim(),
				response,
				save_response,
			);
			resolve(true);
		});
	} catch (error: any) {
		log(
			`Services/webhook.manageWebHook(e) => ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		saveLog(
			`Services/webhook.manageWebHook(e) => Error in webhook: ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return false;
	}
}

/**
 * Makes an API call to the specified URL with the provided data.
 * @param url - The URL to make the API call to.
 * @param request - The request to send in the API call.
 * @returns A Promise that resolves to the API response or rejects with an error.
 */
async function callApi(url: string, request: any): Promise<any> {
	try {
		return new Promise(async (resolve, reject) => {
			const { query, body } = request;
			await axios
				.post(url, body || {}, { params: query || {} })
				.then((response: any) => {
					resolve({ status: 'success', response: response.data });
				})
				.catch((error: any) => {
					saveLog(
						`Services/webhook.callApi(e).catch => Error in API call: ${JSON.stringify(error)} || ${error}`,
						'error',
					);
					resolve({ status: 'error', response: error.message });
				});
		});
	} catch (error: any) {
		saveLog(
			`Services/webhook.callApi(e) => Error in API call: ${JSON.stringify(error.message)} || ${error}`,
			'error',
		);
		return { status: 'error', response: error.message };
	}
}
