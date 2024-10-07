import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import os from 'os';

import 'dotenv/config';
import 'colors';

import { log, saveLog } from './lib/Logger';
import routes from './Routes/index';

/**
 * Represents the main application class.
 */
class APP {
	public server: any;
	public app: Application;
	public port: number = Number(process.env.PORT) || 1234;
	private PublicPath = path.join(__dirname, '..', 'client', 'build');

	/**
	 * Represents the App class.
	 */
	constructor() {
		this.app = express();
		// Use your SSL certificates
		const options = {
			key: fs.readFileSync('./server.key'),
			cert: fs.readFileSync('./server.crt'),
		};
		// @ts-ignore
		this.server = createServer(options, this.app);
	}

	/**
	 * Configures the middleware for the application.
	 * This method sets up various middleware functions such as CORS, JSON parsing, body parsing, helmet, etc.
	 */
	private configureMiddleware() {
		this.app.use(cors());
		this.app.use(express.json({ limit: '10kb' }));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	/**
	 * Initializes the scheduler.
	 * Configures middleware, sets up routes, and starts the server.
	 */
	async init() {
		this.configureMiddleware();
		this.app.use(routes);
		this.app.use(express.static(this.PublicPath));
		this.app.get('*', (req, res) => {
			const indexPath = path.join(this.PublicPath, 'index.html');
			if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
			else return res.send('SERVER STARTED');
		});
		// } else {
		// 	this.app.get('*', (req, res) => res.send('SERVER STARTED'));
		// }
		this.server
			.listen(this.port, this.onServerStart)
			.on('error', this.onServerError);
	}

	/**
	 * Callback function called when the server starts.
	 * It logs the process ID, current date and time, server link, and network interfaces.
	 */
	private onServerStart = () => {
		const date = new Date();
		const dateTime = date.toLocaleString('en-US', {
			timeZone: 'Asia/Kolkata',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true,
		});
		log(
			`{ message: 'Server started', port: '${this.port}', pid: '${process.pid}', time: '${dateTime}' }`,
		);
		log();
	};

	/**
	 * Handles the server error.
	 *
	 * @param error - The error object.
	 */
	private onServerError = (error: any) => {
		if (error.code === 'EADDRINUSE') {
			log(`Port ${this.port} is already in use`, 'error');
			saveLog(
				`APP:class.onServerError().true => Server startup error: Port ${this.port} is already in use`,
				'error',
			);
			setTimeout(() => {
				this.checkPortAvailability(this.port).then(available => {
					if (available) this.server.listen(this.port);
					else process.exit(1);
				});
			}, 5000);
		} else {
			log(`Error starting server: ${JSON.stringify(error)}`, 'error');
			saveLog(
				`APP:class.onServerError().false => Server startup error: ${JSON.stringify(error)}`,
				'error',
			);
			process.exit(1);
		}
	};

	/**
	 * Checks if a given port is available for listening.
	 *
	 * @param port - The port number to check.
	 * @returns A promise that resolves to a boolean indicating if the port is available or not.
	 */
	private checkPortAvailability(port: number): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			const server = createServer();
			server.once('error', (err: any) => {
				if (err.code === 'EADDRINUSE') resolve(false);
				else resolve(true);
			});
			server.once('listening', () => {
				server.close(() => resolve(true));
			});
			server.listen(port);
		});
	}

	/**
	 * Closes the server and exits the process.
	 */
	async close() {
		await this.server?.close(() => {
			process.exit(1);
		});
	}
}

export default APP;
