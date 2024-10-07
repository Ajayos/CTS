import { exec } from 'child_process';
import DB from '../lib/DB';
import { saveLog } from '../lib/Logger';

export async function getWebHooks(): Promise<any[] | false> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = `SELECT * FROM ajayos.webhook_response order by id desc limit 100;`;
			await DB.query(query)
				.then((results: any) => {
					resolve(results.rows);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application.getWebHooks().Promise.query(e) => Error getting webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve([]);
				});
		});
	} catch (error) {
		saveLog(
			`Services/application.getWebHooks(e) => Error in getWebHooks: ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return false;
	}
}

export async function getWebHookConfig(): Promise<any[] | false> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = `SELECT * FROM ajayos.webhook_info;`;
			await DB.query(query)
				.then((results: any) => {
					resolve(results.rows);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application:getWebHookConfig().Promise.query(e) => Error getting webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve([]);
				});
		});
	} catch (err) {
		saveLog(
			`Services/application:getWebHookConfig(e) => Error in getWebHookConfig: ${JSON.stringify(err)} || ${err}`,
			'error',
		);
		return false;
	}
}

export async function updateWebHookConfig(data: any): Promise<boolean> {
	try {
		return new Promise(async (resolve, reject) => {
			console.log(data);
			const query = `UPDATE ajayos.webhook_info 
               SET webhooks = '${JSON.stringify(data.webhooks, null, 2)}', 
                   path_webhook = '${data.path_webhook}', 
                   status = '${data.status}' 
               WHERE id = ${data.status};`;
			await DB.query(query)
				.then(async () => {
					resolve(true);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application:updateWebHookConfig().Promise.query(e) => Error updating webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error) {
		saveLog(
			`Services/application:updateWebHookConfig(e) => Error in updateWebHookConfig: ${JSON.stringify(
				error,
			)} || ${error}`,
			'error',
		);
		return false;
	}
}

async function saveWebHookInfo(data: any): Promise<boolean> {
	try {
		const data_to_db = {
			id: data.id,
			path_webhook: data.path_webhook,
			status: data.status,
			webhooks: data.webhooks,
		};
		return new Promise(async (resolve, reject) => {
			const query = `INSERT INTO ajayos.webhook_info (path_webhook, status, webhooks) VALUES ('${data.path_webhook}', ${data.status}, '${data_to_db}') ON DUPLICATE KEY UPDATE status = VALUES(status), webhooks = VALUES(webhooks)`;
			await DB.query(query)
				.then((results: any) => {
					resolve(true);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application.saveWebHookInfo().Promise.query(e) => Error saving webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error) {
		saveLog(
			`Services/application:saveWebHookInfo(e) => Error in saveWebHookInfo: ${JSON.stringify(
				error,
			)} || ${error}`,
			'error',
		);
		return false;
	}
}

export async function updateStatus(data: any): Promise<boolean> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = `UPDATE ajayos.webhook_info SET status = ${data.status} WHERE id = ${data.id};`;
			await DB.query(query)
				.then(async () => {
					resolve(true);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application:updateWebHookConfig().Promise.query(e) => Error updating webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error) {
		saveLog(
			`Services/application:updateStatus(e) => Error in updateWebHookConfig: ${JSON.stringify(
				error,
			)} || ${error}`,
			'error',
		);
		return false;
	}
}

export async function deleteConfig(data: any): Promise<boolean> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = `DELETE FROM ajayos.webhook_info WHERE id = ${data.id}`;
			await DB.query(query)
				.then(async () => {
					resolve(true);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application:updateWebHookConfig().Promise.query(e) => Error updating webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error) {
		saveLog(
			`Services/application:deleteConfig(e) => Error in updateWebHookConfig: ${JSON.stringify(
				error,
			)} || ${error}`,
			'error',
		);
		return false;
	}
}

export async function addConfig(data: any): Promise<boolean> {
	try {
		return new Promise(async (resolve, reject) => {
			console.log(data);
			const query = `INSERT INTO ajayos.webhook_info ('path_webhook', 'status', 'webhooks') VALUES (${data.path_webhook}, ${data.status}, ${data.webhooks});`;
			await DB.query(query)
				.then(async () => {
					resolve(true);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/application:updateWebHookConfig().Promise.query(e) => Error updating webhook info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve(false);
				});
		});
	} catch (error) {
		saveLog(
			`Services/application:addConfig(e) => Error in updateWebHookConfig: ${JSON.stringify(
				error,
			)} || ${error}`,
			'error',
		);
		return false;
	}
}
