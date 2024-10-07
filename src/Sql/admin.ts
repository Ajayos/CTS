import { saveLog } from '../lib/Logger';
import DB from '../lib/DB';

export async function getAdmins(): Promise<any> {
	try {
		return new Promise(async (resolve, reject) => {
			const query = `SELECT * FROM ajayos.admin_info`;
			await DB.query(query)
				.then((results: any) => {
					resolve(results.rows);
				})
				.catch((error: any) => {
					saveLog(
						`Sql/admin.getAdmins().Promise.query(e) => Error getting admin info ${JSON.stringify(
							error,
						)} || ${error}`,
						'error',
					);
					resolve([]);
				});
		});
	} catch (error) {
		saveLog(
			`Services/admin.getAdmins(e) => Error in getAdmins: ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		return false;
	}
}
