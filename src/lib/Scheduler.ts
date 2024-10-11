import { log, saveLog } from './Logger';
import fs from 'fs';

/**
 * Represents the data structure for a message.
 *
 * @remarks
 * This interface defines the properties of a message, including the sender's phone number, receiver's phone number, and the text of the message.
 */
interface Data {
	senderPhoneNumber: string;
	text: string;
	business_id: string;
}

/**
 * Represents a task that is scheduled to be executed at a specific time.
 */
class Task {
	public id: string;
	public time: Date;
	public data: Data;

	/**
	 * Creates a new instance of the Task class.
	 * @param id The unique identifier for the task.
	 * @param time The time at which the task should be executed.
	 * @param data The data associated with the task.
	 */
	constructor(id: string, time: Date, data: Data) {
		this.id = id;
		this.time = time;
		this.data = data;
	}

	/**
	 * Runs the scheduler.
	 *
	 * @returns A promise that resolves when the scheduler has finished running.
	 */
	async run(): Promise<void> {}
}

/**
 * Schedules a task to be executed at a specific time.
 * @param id The unique identifier for the task.
 * @param time The time at which the task should be executed.
 * @param data The data associated with the task.
 *
 * @example
 *
 * // Schedule a task to be executed at a specific time
 * Scheduler.scheduleTask('task1', new Date(2024, 6, 22, 12, 0, 0), {
 * 	senderPhoneNumber: '1234567890',
 * 	business_id: '1234567890',
 *  text: 'Task executed at 12:00:00 on 22nd July 2024'
 * });
 *
 * // Schedule another task to be executed at a specific time
 * Scheduler.scheduleTask('task2', new Date(2024, 6, 23, 12, 0, 0),  {
 * 	senderPhoneNumber: '1234567890',
 * 	business_id: '1234567890',
 *  text: 'Task executed at 12:00:00 on 23rd July 2024'
 * });
 *
 * // Schedule a task to be executed after 5 seconds
 * Scheduler.scheduleTask('task3', new Date(Date.now() + (5 * 1000)), {
 * 	senderPhoneNumber: '1234567890',
 * 	business_id: '1234567890',
 *   text: 'Task executed after 5 seconds'
 * });
 *
 * // Schedule a task to be executed after 10 seconds
 * Scheduler.scheduleTask('task4', new Date(Date.now() + 10000), {
 * 	senderPhoneNumber: '1234567890',
 * 	business_id: '1234567890',
 *  text: 'Task executed after 10 seconds'
 * });
 *
 */
class Scheduler {
	private static tasks: Task[] = [];
	public static tokenTimeOut: number = 0;

	/**
	 * Schedules a task to be executed at a specific time.
	 * @param id The unique identifier for the task.
	 * @param time The time at which the task should be executed.
	 * @param data The data associated with the task.
	 *
	 * @example
	 *
	 * // Schedule a task to be executed at a specific time
	 * Scheduler.scheduleTask('task1', new Date(2024, 6, 22, 12, 0, 0), {
	 * 	senderPhoneNumber: '1234567890',
	 * 	business_id: '1234567890',
	 *  text: 'Task executed at 12:00:00 on 22nd July 2024'
	 * });
	 *
	 * // Schedule another task to be executed at a specific time
	 * Scheduler.scheduleTask('task2', new Date(2024, 6, 23, 12, 0, 0),  {
	 * 	senderPhoneNumber: '1234567890',
	 * 	business_id: '1234567890',
	 *  text: 'Task executed at 12:00:00 on 23rd July 2024'
	 * });
	 *
	 * // Schedule a task to be executed after 5 seconds
	 * Scheduler.scheduleTask('task3', new Date(Date.now() + (5 * 1000)), {
	 * 	senderPhoneNumber: '1234567890',
	 * 	business_id: '1234567890',
	 *   text: 'Task executed after 5 seconds'
	 * });
	 *
	 * // Schedule a task to be executed after 10 seconds
	 * Scheduler.scheduleTask('task4', new Date(Date.now() + 10000), {
	 * 	senderPhoneNumber: '1234567890',
	 * 	business_id: '1234567890',
	 *  text: 'Task executed after 10 seconds'
	 * });
	 *
	 */
	static scheduleTask(id: string, time: Date, data: Data): void {
		Scheduler.tasks.push(new Task(id, time, data));
	}

	/**
	 * Starts the scheduler to execute tasks at their scheduled times.
	 */
	static start(): void {
		setInterval(async () => {
			const currentTime = new Date();
			for (let i = 0; i < Scheduler.tasks.length; i++) {
				const task = Scheduler.tasks[i];
				if (task.time <= currentTime) {
					task.run();
					Scheduler.tasks.splice(i, 1); // Remove the task from the scheduler
					i--; // Decrement i to account for the removed task
				}
			}
		}, 1000); // Check every second
	}

	/**
	 * Removes a task from the scheduler by its ID.
	 * @param id The unique identifier of the task to be removed.
	 */
	static removeTask(id: string): void {
		const index = Scheduler.tasks.findIndex(task => task.id === id);
		if (index !== -1) {
			Scheduler.tasks.splice(index, 1);
		}
	}

	/**
	 * Sets the data for the Scheduler.
	 *
	 * @param data - The data to be set.
	 * @returns A promise that resolves when the data is set.
	 */
	static async setData(data: any): Promise<void> {
		try {
			Scheduler.tasks = [...Scheduler.tasks, ...data.tasks];
			Scheduler.tokenTimeOut = data.tokenTimeOut;
		} catch (error: any) {
			log(error, 'error');
			saveLog(
				`lib/Scheduler.class.setData => error message: ${error} || error stack: ${error.stack} || JSON: ${JSON.stringify(error)}`,
			);
		}
	}
}

export default Scheduler;
