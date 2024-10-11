import DailyRotateFile from 'winston-daily-rotate-file';
import { format, createLogger } from 'winston';
import fs from 'fs';
import 'colors';

/**
 * Represents a logger that provides logging functionality.
 */

class Logger {
	/**
	 * The time zone for logging. Defaults to 'Asia/Kolkata'.
	 */
	private timeZone: string;
	/**
	 * The format for displaying the hour. Defaults to 'numeric'.
	 */
	private hour: string;
	/**
	 * The format for displaying the minute. Defaults to 'numeric'.
	 */
	private minute: string;
	/**
	 * Determines whether to use 12-hour format. Defaults to false.
	 */
	private hour12: boolean;
	/**
	 * The filename pattern for log files. Defaults to 'logs/%DATE%.log'.
	 */
	private filename: string;
	/**
	 * The date pattern for log files. Defaults to 'YYYY-MM/DD'.
	 */
	private datePattern: string;
	/**
	 * Determines whether to compress archived log files. Defaults to false.
	 */
	private zippedArchive: boolean;
	/**
	 * The maximum size of log files. Defaults to '1g'.
	 */
	private maxSize: string;
	/**
	 * The log level. Defaults to 'info'.
	 */
	private level: string;
	/**
	 * The Winston logger instance.
	 */
	private logger: any;

	/**
	 * Creates an instance of the Logger class.
	 * @param options - The options for configuring the logger.
	 * @example
	 * const logger = new Logger({
	 *   timeZone: 'Asia/Kolkata',
	 *   hour: 'numeric',
	 *   minute: 'numeric',
	 *   hour12: false,
	 *   filename: 'logs/%DATE%.log',
	 *   datePattern: 'YYYY-MM/DD',
	 *   zippedArchive: false,
	 *   maxSize: '1g',
	 *   level: 'info',
	 * });
	 */ constructor(options?: {
		timeZone?: string;
		hour?: string;
		minute?: string;
		hour12?: number;
		filename?: string;
		datePattern?: string;
		zippedArchive?: boolean;
		maxSize?: string;
		level?: string;
	}) {
		this.timeZone = options?.timeZone || 'Asia/Kolkata';
		this.hour = options?.hour || 'numeric';
		this.minute = options?.minute || 'numeric';
		this.hour12 = true; // options?.hour12 === 1 ? true : options?.hour12 === 0 ? false : false;
		this.filename = options?.filename || 'logs/%DATE%.log';
		this.datePattern = options?.datePattern || 'YYYY-MM/DD';
		this.zippedArchive = options?.zippedArchive || false;
		this.maxSize = options?.maxSize || '1g';
		this.level = options?.level || 'info';

		this.start();
	}

	/**
	 * Returns the current time formatted according to the specified time zone and options.
	 * @returns A string representing the current time in the specified time zone.
	 */
	private timeZoned(): string {
		const date: Date = new Date();
		const options = {
			timeZone: this.timeZone,
			hour: this.hour,
			minute: this.minute,
			hour12: this.hour12,
		};
		// @ts-ignore
		return new Intl.DateTimeFormat('en-US', options).format(date);
	}

	/**
	 * The format function used by the logger.
	 * @private
	 */
	private myFormat = format.printf(({ message, level }) => {
		return `[${this.timeZoned()}] [${level}] ${message}`;
	});

	/**
	 * Starts the logger and initializes the necessary configurations.
	 */
	private start(): void {
		const logDirectory = 'logs';
		if (!fs.existsSync(logDirectory)) {
			fs.mkdirSync(logDirectory, { recursive: true });
		}

		const transport: DailyRotateFile = new DailyRotateFile({
			filename: this.filename,
			datePattern: this.datePattern,
			zippedArchive: this.zippedArchive,
			maxSize: this.maxSize,
			format: format.combine(
				format.timestamp({ format: this.timeZoned }),
				this.myFormat,
			),
			level: this.level,
		});

		this.logger = createLogger({
			level: this.level,
			format: format.combine(
				format.timestamp({ format: this.timeZoned }),
				this.myFormat,
			),
			transports: [transport],
		});
	}

	/**
	 * Saves a log message with the specified type.
	 * @param text - The log message to be saved.
	 * @param type - The type of the log message. Defaults to 'info'.
	 */
	public saveLog(text: string | null, type: string = 'info'): void {
		if (text === null)
			return this.winstonLog(`> [-]>-----------------------------<`, '[-] ');

		type = type.toLowerCase();
		const typeMap: { [key: string]: string } = {
			e: 'error',
			w: 'warn',
			i: 'info',
			d: 'debug',
			f: 'fatal',
			l: 'line',
		};
		type = typeMap[type] || type;

		switch (type) {
			case 'error':
			case 'warn':
			case 'info':
			case 'debug':
			case 'fatal':
				this.logger.log(type, text);
				break;
			case 'line':
				this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
				break;
			default:
				this.logger.log('info', text);
				break;
		}
	}

	/**
	 * Logs the given text with the specified type using Winston logger.
	 * @param text - The text to be logged.
	 * @param type - The type of the log message.
	 */
	private winstonLog(text: string, type: string): void {
		let level: string;
		switch (type) {
			case '[e] ':
				level = 'error';
				break;
			case '[w] ':
				level = 'warn';
				break;
			case '[i] ':
				level = 'info';
				break;
			case '[d] ':
				level = 'debug';
				break;
			case '[f] ':
				level = 'fatal';
				break;
			default:
				level = 'info';
				break;
		}
		this.logger.log(level, text);
	}

	/**
	 * Logs a message with an optional type.
	 * @param text - The message to be logged.
	 * @param type - The type of the log message. Defaults to 'info'.
	 */
	public log(text?: string, type: string = 'info'): void {
		type = type?.toLowerCase();

		function output(this: Logger) {
			console.log(`>-----------------------------<`.cyan);
			// this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
		}

		if (text === undefined) {
			console.log(`>-----------------------------<`.cyan);
			// this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
			return;
		}

		const typeMap: { [key: string]: string } = {
			e: 'error',
			w: 'warn',
			i: 'info',
			d: 'debug',
			f: 'fatal',
			l: 'line',
		};

		type = typeMap[type] || type;

		switch (type) {
			case 'error':
				console.log(
					`>`.cyan + ` [`.blue + `x`.red + `]`.blue + `>`.cyan + ` ${text}`.red,
				);
				// this.winstonLog(`> [x]> ` + text + ' > ', '[e] ');
				break;
			case 'warn':
				console.log(
					`>`.cyan +
						` [`.blue +
						`!`.yellow +
						`]`.blue +
						`>`.cyan +
						` ${text}`.yellow,
				);
				// this.winstonLog(`> [!]> ` + text + ' > ', '[w] ');
				break;
			case 'info':
				console.log(
					`>`.cyan +
						` [`.blue +
						`*`.green +
						`]`.blue +
						`>`.cyan +
						` ${text}`.green,
				);
				// this.winstonLog(`> [*]> ` + text + ' > ', '[i] ');
				break;
			case 'debug':
				console.log(
					`>`.cyan +
						` [`.blue +
						`*`.magenta +
						`]`.blue +
						`>`.cyan +
						` ${text}`.magenta,
				);
				// this.winstonLog(`> [*]> ` + text + ' > ', '[d] ');
				break;
			case 'fatal':
				console.log(
					`>`.cyan +
						` [`.blue +
						`!`.bgRed.white +
						`]`.blue +
						`>`.cyan +
						` ${text}`.bgRed.white,
				);
				// this.winstonLog(`> [!]> ` + text + ' > ', '[f] ');
				break;
			case 'line':
				console.log(`>-----------------------------<`.cyan);
				// this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
				break;
			default:
				console.log(
					`>`.cyan +
						` [`.blue +
						`*`.green +
						`]`.blue +
						`>`.cyan +
						` ${text}`.green,
				);
				// this.winstonLog(`> [*]> ` + text + ' > ', '[i] ');
				break;
		}
	}
}

const Log = new Logger();
export default Log;
export const saveLog = Log.saveLog.bind(Log);
export const log = Log.log.bind(Log);
