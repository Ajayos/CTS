"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('*')
    .get((req, res) => res.json({ message: 'Invalid method' }))
    .put((req, res) => res.json({ message: 'Invalid method' }))
    .delete((req, res) => res.json({ message: 'Invalid method' }));
router.route('*').all((req, res) => {
    return res.json({ message: 'Invalid request' });
});
exports.default = router;
