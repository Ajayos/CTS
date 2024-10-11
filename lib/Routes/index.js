"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../lib/Logger");
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const router = (0, express_1.Router)();
// Specify the path to the folder containing your API modules
const apiFolderPath = (0, path_1.join)(__dirname, '.');
try {
    // Read all files in the folder (excluding index.js)
    const apiFiles = (0, fs_1.readdirSync)(apiFolderPath).filter(file => file.endsWith('.js') && file !== 'index.js');
    // Import and export each module dynamically
    apiFiles.forEach(file => {
        let endpoint;
        const versionMatch = file.match(/\.v(\d+)\.js$/); // Match version in format vX
        if (versionMatch) {
            // If the file name is app.vX.js, where X is the version number
            const version = versionMatch[1]; // Extract the version number
            endpoint = `/api/${file.replace(`.v${version}.js`, '')}/v${version}/`;
        }
        else if (file.match(/\.js$/) && !file.includes('._.')) {
            // If the file name is app.js (but not app._.js) path /api/app/
            endpoint = `/api/${file.replace('.js', '')}/`;
        }
        else if (file.match(/._.js$/)) {
            // If the file name is app._.js
            endpoint = `/${file.replace('._.js', '')}/`;
        }
        else {
            // Handle any other cases, if necessary (e.g., app.js) path /app/
            endpoint = `/${file.replace('.js', '')}/`;
        }
        const modulePath = `./${file}`;
        const apiModule = require(modulePath).default;
        // Export dynamically
        router.use(endpoint, apiModule);
        router.all('/api/*', (req, res) => {
            return res.status(404).json({
                message: 'Invalid route',
                status: 404,
                error: true,
                data: null,
            });
        });
    });
}
catch (error) {
    (0, Logger_1.saveLog)(`Routes/index:(e) => Error in API routes: ${JSON.stringify(error)} || ${error}`, 'error');
    (0, Logger_1.log)(error, 'error');
}
exports.default = router;
