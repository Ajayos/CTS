import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { createServer, Server } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import 'dotenv/config';
import 'colors';

import { log, saveLog } from './Logger';
import routes from '../Routes/index';
import { errorHandler } from '../middleware';

class APP {
	public server: Server;
	public app: Application & { config?: any };
	public port: number = Number(process.env.PORT) || 1223;

	constructor() {
		this.app = express();
		this.server = createServer(this.app);
		// Define your app's configuration here
		this.app.config = {
			cookie: {
				name: '_crt_cookie',
				value: 'hehehehehe',
				secure: true,
				httpOnly: true,
				sameSite: 'Strict',
			},
		};
		this.configureMiddleware();
		this.cookieSetUp();
	}

	// Configure all middleware
	private configureMiddleware() {
		this.app.use(cors());
		this.app.use(express.json({ limit: '10kb' }));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(helmet());
	}

	// Set up cookies if not already present
	private cookieSetUp() {
		this.app.use((req, res, next) => {
			const cookieName = this.app.config?.cookie?.name;
			const cookieValue = this.app.config?.cookie?.value;

			// Check if the cookie is found in the request
			if (req.cookies && req.cookies[cookieName]) {
				console.log(`Cookie "${cookieName}" found. Proceeding.`);
				next();
			} else {
				// Cookie not found, set it
				res.cookie(cookieName, cookieValue, {
					secure: this.app.config?.cookie?.secure || false,
					httpOnly: this.app.config?.cookie?.httpOnly || false,
					sameSite: this.app.config?.cookie?.sameSite || 'Lax',
				});
				console.log(`Cookie "${cookieName}" not found. Setting it now.`);
				next();
			}
		});
	}

	// Initialize server with routes and handling 404 errors
	async init() {
		this.app.use(routes);

		this.app.get('*', (req, res) => {
			res.redirect(301, 'https://ajayos.github.io/');
		});

		this.app.all('*', async (req, res) => {
			return res.status(404).json({
				message: 'Invalid route',
				status: 404,
				error: true,
				data: null,
			});
		});

		this.app.use(errorHandler);

		this.server
			.listen(this.port, this.onServerStart)
			.on('error', this.onServerError);
	}

	// Callback for when the server successfully starts
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
			`{ message: 'Server started', port: '${this.port}', time: '${dateTime}' }`,
		);
		log();
	};

	// Handle server startup errors, including port already in use
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

	// Check if the port is available before retrying the server startup
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

	// Close the server gracefully
	async close() {
		await this.server?.close(() => {
			process.exit(1);
		});
	}
}

export default APP;
