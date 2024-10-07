/**
 * @module src/Routes/test.v1
 * @create_date 19-08-2024
 * @last_update 19-08-2024
 * @created_by Ajay o s
 * @last_updated_by Ajay o s
 * @version 1.0.0
 * @description test route module
 *
 */

import express, { Request, Response } from 'express';
import { log, saveLog } from '../lib/Logger';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		log(`Routes/test:(i) => ${name}`, 'info');
		const randomNumber = Math.floor(Math.random() * 75) + 1;
		return res.json({ name: `- ${name}`, age: randomNumber });
	} catch (error: any) {
		saveLog(
			`Routes/test:(e) => Error in webhook: ${JSON.stringify(error)} || ${error}`,
			'error',
		);
		log(error, 'error');
	}
	return res.json({ message: 'Webhook received successfully' });
});

export default router;
