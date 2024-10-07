import express from 'express';
import {
	getWebHookConfig,
	getWebHooks,
	updateWebHookConfig,
	updateStatus,
	deleteConfig,
	addConfig,
} from '../controllers/application.v1';
const router = express.Router();

router.post('/webhooks', getWebHooks);
router.post('/webhooks/config', getWebHookConfig);
router.post('/webhooks/config/update', updateWebHookConfig);
router.post('/webhooks/config/status', updateStatus);
router.post('/webhooks/config/delete', deleteConfig);
router.post('/webhooks/config/add', addConfig);
// router
// router.post('/me', me);

export default router;
