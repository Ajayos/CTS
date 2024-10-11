import cluster from 'cluster';
import APP from './lib/App';
import { log, saveLog } from './lib/Logger';
import os from 'os';
import DB from './_config/_database_config';

// Start the server and the scheduler
if (cluster.isPrimary) {
	const numCPUs = os.cpus().length;
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', worker => {
		cluster.fork();
	});
} else {
	class CTS extends APP {
		constructor() {
			super();
		}

		async start(): Promise<void> {
			await DB.connect();
			this.init();
		}

		async stop(): Promise<void> {
			this.close();
		}
	}

	const cts = new CTS();

	async function main(): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				await cts.start();
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

	process.on('unhandledRejection', async (err: any) => {
		log(err, 'e');
		saveLog(`UNHANDLED REJECTION! ${err.stack || err.toString()}`, 'e');
		log('UNHANDLED REJECTION! Shutting down ...', 'w');
		await cts.stop();
	});

	process.on('uncaughtException', async (err: any) => {
		log(err, 'e');
		saveLog(`UNCAUGHT Exception! ${err.stack || err.toString()}`, 'e');
		log('UNCAUGHT Exception! Shutting down ...', 'w');
		await cts.stop();
	});

	Promise.all([main()]).catch(err => {
		saveLog(`Error starting server ${JSON.stringify(err)} || ${err}`, 'e');
		log(err.toString(), 'e');
	});

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
		//
	});

	// Handle SIGINT (Ctrl + C) signal
	process.on('SIGINT', async () => {
		log('SIGINT received', 'i');
		await cts.stop();
		process.exit(0);
	});
}
