/**
 * @module src/Routes/index
 * @create_date 19-08-2024
 * @last_update 19-08-2024
 * @created_by Ajay o s
 * @last_updated_by Ajay o s
 * @version 1.0.1
 * @description The index file for API routes.
 */

import { log, saveLog } from '../lib/Logger';
import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const router = Router();

// Specify the path to the folder containing your API modules
const apiFolderPath = join(__dirname, '.');

try {
	// Read all files in the folder (excluding index.js)
	const apiFiles = readdirSync(apiFolderPath).filter(
		file => file.endsWith('.js') && file !== 'index.js',
	);

	// Import and export each module dynamically
	apiFiles.forEach(file => {
		let endpoint: string;

		if (file.match(/\.v1\.js$/)) {
			// If the file name is name.v1.js
			endpoint = `/api/${file.replace(/\.v1\.js$/, '')}/v1/`;
		} else if (file.match(/\.js$/) && !file.includes('._.')) {
			// If the file name is name.js (but not name._.js)
			endpoint = `/api/${file.replace('.js', '')}/`;
		} else if (file.match(/._.js$/)) {
			// If the file name is name._.js
			endpoint = `/${file.replace('._.js', '')}/`;
		} else {
			// Handle any other cases, if necessary
			endpoint = `/${file.replace('.js', '')}/`;
		}

		const modulePath = `./${file}`;
		const apiModule = require(modulePath).default;

		// Export dynamically
		router.use(endpoint, apiModule);
	});
} catch (error: any) {
	saveLog(
		`Routes/index:(e) => Error in API routes: ${JSON.stringify(error)} || ${error}`,
		'error',
	);
	log(error, 'error');
}

export default router;
