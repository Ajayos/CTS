/**
 * @module src/lib/DB
 * @create_date 18-08-2024
 * @last_update 18-08-2024
 * @created_by Ajay o s
 * @last_updated_by Ajay o s
 * @version 1.0.0
 * @description Represents a database connection.
 */

import { log, saveLog } from './Logger';
import MySql2 from 'mysql2/promise';
import 'dotenv/config';
class DB {
	private pool: MySql2.Pool;
	private retryCount: number = 0;
	private maxRetries: number = 10;

	/**
	 * Represents a database connection.
	 */
	constructor() {
		this.pool = MySql2.createPool({
			host: process.env.SQL_HOST || 'localhost',
			user: process.env.SQL_USER || 'root',
			password: process.env.SQL_PASSWORD || 'keerthanaajay@123',
			database: process.env.SQL_DATABASE || 'ajayos',
			port: 3306,
			multipleStatements: true,
			namedPlaceholders: true,
			waitForConnections: true,
			connectionLimit: 15,
			maxIdle: 1,
			idleTimeout: 60000,
			queueLimit: 500,
		});
	}

	/**
	 * Establishes a connection to the database.
	 * @returns A Promise that resolves when the connection is established.
	 */
	public async connect(): Promise<void> {
		try {
			await this.pool.getConnection().then(() => {
				log('Connected to database', 'info');
				this.retryCount = 0;
			});
		} catch (error: any) {
			log(error, 'error');
			await saveLog(
				`lib/DB:class.connect(e) => Error connecting to database  ${JSON.stringify(error)} || ${error} || ${error.stack} ||`,
				'error',
			);
			if (
				error.code === 'PROTOCOL_CONNECTION_LOST' ||
				error.code === 'ETIMEDOUT' ||
				error.code === 'ECONNREFUSED' ||
				error.code === 'EHOSTUNREACH'
			) {
				if (this.retryCount < this.maxRetries) {
					saveLog(
						`lib/DB:class.connect() => Retrying connection ${this.retryCount}`,
						'info',
					);
					log(`Retrying connection ${this.retryCount}....`, 'info');
					this.retryCount++;
					await this.connect();
				} else {
					await saveLog(
						`lib/DB:class.connect(e) => Error connecting to database  ${JSON.stringify(error)} || ${error} || ${error.stack} `,
						'error',
					);
				}
			}
		}
	}

	/**
	 * Executes the provided SQL query and returns the result.
	 * @param sql - The SQL query to execute.
	 * @param params - The parameters to pass to the query. Default is an empty array.
	 * @returns A Promise that resolves to an object containing the query result.
	 * The object has two properties: `rows` and `fields`.
	 * - `rows` is an array of rows returned by the query.
	 * - `fields` is an array of field metadata for the query result.
	 * @example
	 * const db = new DB();
	 * const sql = 'SELECT * FROM users';
	 * const result = await db.query(sql);
	 * console.log(result.rows); // Array of rows returned by the query
	 * console.log(result.fields); // Array of field metadata for the query result
	 */
	public async query(
		sql: string,
		params: any[] = [],
	): Promise<{ rows: any; fields: any }> {
		try {
			if (this.pool === null) {
				await this.connect();
			}
			const [rows, fields] = await this.pool!.query(sql, params);
			return { rows, fields };
		} catch (error: any) {
			log(error, 'error');
			await saveLog(
				`lib/DB:class.query(e) => Error executing SQL query ${JSON.stringify(error)} || ${error} || ${error.stack} `,
				'error',
			);
			return { rows: [], fields: [] };
		}
	}

	/**
	 * Checks if the database connection is established.
	 * @returns A promise that resolves to a boolean indicating the connection status.
	 */
	public async isConnected(): Promise<boolean> {
		try {
			await this.pool.getConnection();
			return true;
		} catch (error: any) {
			log(error, 'error');
			await saveLog(
				`lib/DB:class.isConnected(e) => Error checking database connection ${JSON.stringify(error)} || ${error} || ${error.stack} `,
				'error',
			);
			return false;
		}
	}

	/**
	 * Closes the database connection.
	 * @returns A promise that resolves when the connection is closed.
	 * @throws If an error occurs while closing the connection.
	 */
	public async close(): Promise<void> {
		try {
			await this.pool.end();
			log('Database connection closed', 'info');
		} catch (error: any) {
			await saveLog(
				`lib/DB:class.close(e) => Error closing database connection ${JSON.stringify(error)} || ${error} || ${error.stack} `,
				'error',
			);
			throw error;
		}
	}

	/**
	 * Executes a stored procedure with the provided query and data.
	 * @param query - The query to execute.
	 * @returns A Promise that resolves with the output of the stored procedure.
	 */
	public async executePrc(query: string): Promise<any> {
		try {
			var output = '';
			const pool = this.pool;
			const self = this;
			return new Promise(async function (resolve, reject) {
				pool
					.getConnection()
					.then(function (connection: any) {
						connection
							.query(query, [])
							.then(function (results: any) {
								connection.release();
								const out = results[0];
								resolve(out);
							})
							.catch(function (error: any) {
								connection.release();
								saveLog(
									`lib/DB:class.executePrc().then(e) => Error executing stored procedure ${JSON.stringify(error)} || ${error} || ${error.stack} `,
									'error',
								);
								log(
									`Error executing stored procedure ${JSON.stringify(error)} || ${error} `,
									'error',
								);
								reject(error);
							});
					})
					.catch(async function (error: any) {
						saveLog(
							`lib/DB:class.executePrc().catch(e) => Error executing stored procedure ${JSON.stringify(error)} || ${error} || ${error.stack} `,
							'error',
						);

						if (
							error.code === 'PROTOCOL_CONNECTION_LOST' ||
							error.code === 'EHOSTUNREACH' ||
							error.code === 'ETIMEDOUT' ||
							error.code === 'ECONNREFUSED'
						) {
							if (self.retryCount < self.maxRetries) {
								saveLog(
									`lib/DB:class.executePrc() => Retrying connection ${self.retryCount}`,
									'info',
								);
								log(`Retrying connection ${self.retryCount}....`, 'info');
								self.retryCount++;
								await self.connect().catch(e => {
									saveLog(
										`lib/DB:class.executePrc() => Error connecting to database ${JSON.stringify(e)} || ${e} || ${e.stack} `,
										'error',
									);
									log(
										`Error connecting to database ${JSON.stringify(e)} || ${e}`,
										'error',
									);
								});
							} else {
								log(
									`Error connecting to database ${JSON.stringify(error)} || ${error}}`,
									'error',
								);
								await saveLog(
									`lib/DB:class.executePrc(e) => Error connecting to database ${JSON.stringify(error)} || ${error} || ${error.stack} `,
									'error',
								);
							}
						}

						reject(error);
					});
			});
		} catch (error: any) {
			log(error, 'error');
			saveLog(
				`lib/DB:class.executePrc().catch(e) => Error executing stored procedure ${JSON.stringify(error)} || ${error} || ${error.stack} `,
				'error',
			);
			throw error; // Ensure the error is thrown to be handled by the caller
		}
	}

	/**
	 * Executes a stored procedure with parameters.
	 * @param query - The SQL query string for the stored procedure.
	 * @param data - The data to be passed as parameters to the stored procedure. Default is an empty array.
	 * @returns A Promise that resolves with the output of the stored procedure.
	 */
	public async executePrcWithParams(
		query: string,
		data: any = [],
	): Promise<any> {
		try {
			var output = '';
			const pool = this.pool;
			const self = this; // Add a reference to 'this'
			return new Promise(async function (resolve, reject) {
				pool
					.getConnection()
					.then(function (connection: any) {
						connection
							.query(query, data)
							.then(function (results: any) {
								connection.release();
								const out = results[0];
								resolve(out);
							})
							.catch(function (error: any) {
								connection.release();
								saveLog(
									`lib/DB:class.executePrc().then(e) => Error executing stored procedure ${JSON.stringify(error)} || ${error} || ${error.stack} `,
									'error',
								);
								log(
									`Error executing stored procedure ${JSON.stringify(error)} || ${error}`,
									'error',
								);
								reject(error);
							});
					})
					.catch(async function (err: any) {
						if (err) {
							saveLog(
								`lib/DB:class.executePrcWithParams().catch(e) => Error executing stored procedure ${JSON.stringify(err)} || ${err} || ${err.stack} `,
								'error',
							);
							if (
								err.code === 'PROTOCOL_CONNECTION_LOST' ||
								err.code === 'EHOSTUNREACH' ||
								err.code === 'ETIMEDOUT' ||
								err.code === 'ECONNREFUSED'
							) {
								// Use 'self' instead of 'this'
								if (self.retryCount < self.maxRetries) {
									saveLog(
										`lib/DB:class.executePrcWithParams() => Retrying connection ${self.retryCount}`, // Use 'self' instead of 'this'
										'info',
									);
									log(`Retrying connection ${self.retryCount}....`, 'info'); // Use 'self' instead of 'this'
									self.retryCount++; // Use 'self' instead of 'this'
									await self.connect().catch(e => {
										saveLog(
											`lib/DB:class.executePrcWithParams().connect(e) => Error connecting to database ${JSON.stringify(e)} || ${e} || ${e.stack} `,
											'error',
										);
										log(
											`Error connecting to database ${JSON.stringify(e)} || ${e}`,
											'error',
										);
									});
								} else {
									log(
										`Error connecting to database ${JSON.stringify(err)} || ${err}}`,
										'error',
									);
									saveLog(
										`lib/DB:class.executePrcWithParams(e) => Error connecting to database ${JSON.stringify(err)} || ${err} || ${err.stack} `,
										'error',
									);
									await Promise.resolve(); // Add an await statement to ensure the promise is awaited.
								}
							}

							reject(err);
						}
					});
			});
		} catch (error: any) {
			log(error, 'error');
			saveLog(
				`lib/DB:class.executePrcWithParams().catch(e) => Error executing stored procedure ${JSON.stringify(error)} || ${error} || ${error.stack} `,
				'error',
			);
		}
	}
}

const db = new DB();
export default db;
export { DB };
