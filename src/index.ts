import { log, saveLog } from './lib/Logger';
import cluster from 'cluster';
import db from './lib/DB';
import APP from './app';
import path from 'path';
import 'dotenv/config';
import os from 'os';
import fs from 'fs';


// Define the SERVER class which extends the APP class
class SERVER extends APP {
	constructor() {
		super();
	}

	/**
	 * Start the server
	 * @returns {Promise<void>}
	 */
	async start(): Promise<void> {
		// // Remove the backup file after loading the data
		await removeBackupFile();

		// Connect to the database and initialize configurations
		await db.connect().then(async () => {
			// await init();
		});

		// Initialize the server
		await this.init();
	}

	/**
	 * Close the server
	 * @returns {Promise<void>}
	 */
	async closeServer(): Promise<void> {
		// Close the database connection and the server
		await db.close();
		await this.close();
		process.exit(0);
	}
}

// Create an instance of SERVER
const server = new SERVER();

// Suppress specific deprecation warnings
process.emitWarning = async (warning, type) => {
	if (type === 'DeprecationWarning') {
		return;
	}
	await saveLog(`process:emitWarning ${warning.toString()} `, 'w');
	log(warning.toString(), 'w');
};

// Handle process exit event
process.on('exit', async () => {
	log('SERVER CLOSED', 'i');
	saveLog('SERVER CLOSED', 'i');
	log();
});

// Handle SIGINT (Ctrl + C) signal
process.on('SIGINT', async () => {
	log('SIGINT received', 'i');
	// saveDataToBackup();

	log('Process Exited', 'i');
	await server.closeServer();
	log();
	process.exit(0);
});

/**
 * The main function that starts the RCS Server.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of starting the server.
 */
async function main(): Promise<boolean> {

	return new Promise(async (resolve, reject) => {
		try {
			log();
			await server.start();
			resolve(true);
		} catch (err) {
			saveLog(
				`main(e) => Error starting server ${JSON.stringify(err)} || ${err}`,
				'e',
			);
			reject(err);
		}
	});
}

Promise.all([main()]).catch(err => {
	saveLog(`Error starting server ${JSON.stringify(err)} || ${err}`, 'e');
	log(err.toString(), 'e');
});

// Start the server and the scheduler
// if (cluster.isPrimary) {
// 	const numCPUs = os.cpus().length;
// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.fork();
// 	}

// 	cluster.on('exit', worker => {
// 		log(`Worker ${worker.process.pid} died, starting a new worker`, 'w');
// 		cluster.fork();
// 	});
// } else {
// }

// Handle uncaught exceptions

process.on('unhandledRejection', async (err: any) => {
	log(err, 'e');
	saveLog(`UNHANDLED REJECTION! ${err.stack || err.toString()}`, 'e');
	log('UNHANDLED REJECTION! Shutting down ...', 'w');
	await server.closeServer();
});

process.on('uncaughtException', async (err: any) => {
	log(err, 'e');
	saveLog(`UNCAUGHT Exception! ${err.stack || err.toString()}`, 'e');
	log('UNCAUGHT Exception! Shutting down ...', 'w');
	await server.closeServer();
});
