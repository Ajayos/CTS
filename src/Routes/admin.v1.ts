/**
 * @module src/Routes/admin.v1
 * @create_date 31-08-2024
 * @last_update 31-08-2024
 * @created_by Ajay o s
 * @last_updated_by Ajay o s
 * @version 1.0.0
 * @description admin route module
 *
 */

import express, { Request, Response } from 'express';
import { log, saveLog } from '../lib/Logger';
import { login, me } from '../controllers/admin.v1';
const router = express.Router();

router.post('/', login);
router.post('/me', me);

export default router;
