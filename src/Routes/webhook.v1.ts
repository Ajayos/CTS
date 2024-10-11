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
