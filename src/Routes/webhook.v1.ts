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

import { Request, Response, Router } from 'express';
const router = Router();

router
	.route('*')
	.get((req: Request, res: Response) => res.json({ message: 'Invalid method' }))
	.put((req: Request, res: Response) => res.json({ message: 'Invalid method' }))
	.delete((req: Request, res: Response) =>
		res.json({ message: 'Invalid method' }),
	);
router.route('*').all((req: Request, res: Response) => {
	return res.json({ message: 'Invalid request' });
});

export default router;
