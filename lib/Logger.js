/**
 * 
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 14-6-2023
 * @editor : Ajayos
 * @file : Logger.js
 * @path : /lib/Logger.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

// Import the nodelogger package
const logger = require("@ajayos/nodelogger");

/**
 * Function to setup the logger
 */
async function setupLogger() {
  // Start the logger with the specified configurations
  await logger.start({
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM/DD',
    zippedArchive: false,
    maxSize: '1g',
    level: 'info'
  });
}

// Export the setupLogger function
module.exports = setupLogger;