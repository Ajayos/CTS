/**
 * @module src/Routes/webhook.v1
 * @create_date 19-08-2024
 * @last_update 19-08-2024
 * @created_by Ajay o s
 * @last_updated_by Ajay o s
 * @version 1.0.0
 * @description Webhook route module
 *
 */

import express, { Request, Response } from 'express';
import { log, saveLog } from '../lib/Logger';
import { manageWebHook } from '../services/webhook';
import { getWebHookInfo } from '../Sql/webHook';

const router = express.Router();

(async () => {
	const all_webHooks = await getWebHookInfo();
	for (const webHook of all_webHooks) {
		router.post(webHook.path_webhook, async (req: Request, res: Response) => {
			try {
				await manageWebHook(webHook.path_webhook, req);
			} catch (error: any) {
				saveLog(
					`Routes/webhook:(e) ${webHook.path_webhook} => Error in webhook: ${JSON.stringify(error)} || ${error}`,
					'error',
				);
				log(error, 'error');
			}
			return res.json({ message: 'Webhook received successfully' });
		});
	}
	router
		.route('*')
		.get((req: Request, res: Response) =>
			res.json({ message: 'Invalid method' }),
		)
		.put((req: Request, res: Response) =>
			res.json({ message: 'Invalid method' }),
		)
		.delete((req: Request, res: Response) =>
			res.json({ message: 'Invalid method' }),
		);
	router.route('*').all((req: Request, res: Response) => {
		return res.json({ message: 'Invalid request' });
	});
})();

export default router;
