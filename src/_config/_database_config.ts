import mongoose from 'mongoose';
import { log, saveLog } from '../lib/Logger';
import 'dotenv/config';

class DB {
	static async connect() {
		try {
			const url = process.env.MONGO_URL;
			// Exit the process with a non-zero status code if the URL is not provided
			if (!url) {
				log(String('MongoDB URL not provided'.red.bold));
				process.exit(1);
			}

			await mongoose.connect(url);

			log(
				String(
					'MongoDB database connection established successfully'.cyan.underline,
				),
			);
		} catch (err) {
			saveLog(
				String(`Error connecting to MongoDB: ${JSON.stringify(err)}`.red.bold),
				'error',
			);
			log(
				String(`Error connecting to MongoDB: ${JSON.stringify(err)}`.red.bold),
				'error',
			);
			process.exit(1);
		}
	}
}

export default DB;
