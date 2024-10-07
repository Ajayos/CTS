import { saveLog } from '../lib/Logger';
import {
	getWebHooks as getWebHooksFromDb,
	getWebHookConfig,
	updateWebHookConfig,
	updateStatus,
	deleteConfig,
	addConfig,
} from '../Sql/application';

interface Out {
	status: number;
	message: string;
	error: boolean;
	data: any;
}

class Application {
	public async getWebHooks(): Promise<Out> {
		try {
			const webhooks: any[] | false = await getWebHooksFromDb();
			if (!webhooks)
				return this.createErrorResponse(500, 'Internal server error!');

			return {
				status: 200,
				message: 'Webhooks successfully fetched',
				error: false,
				data: webhooks,
			};
		} catch (error) {
			saveLog(
				`Services/application.getWebHooks(e) => Error in getWebHooks: ${JSON.stringify(error)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}

	private createErrorResponse(status: number, message: string) {
		return {
			status,
			message,
			error: true,
			data: null,
		};
	}

	public async getWebHookConfig(): Promise<Out> {
		try {
			const config: any[] | false = await getWebHookConfig();
			if (!config)
				return this.createErrorResponse(500, 'Internal server error!');

			return {
				status: 200,
				message: 'Webhooks configuration successfully fetched',
				error: false,
				data: config,
			};
		} catch (error) {
			saveLog(
				`Services/application.getWebHookConfig(e) => Error in getWebHookConfig: ${JSON.stringify(
					error,
				)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}

	public async updateWebHookConfig(data: any): Promise<Out> {
		try {
			const result: boolean = await updateWebHookConfig(data);
			if (!result)
				return this.createErrorResponse(500, 'Internal server error!');

			return {
				status: 200,
				message: 'Webhook configuration successfully updated',
				error: false,
				data: null,
			};
		} catch (error) {
			saveLog(
				`Services/application.updateWebHookConfig(e) => Error in updateWebHookConfig: ${JSON.stringify(
					error,
				)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}

	public async updateStatus(data: any): Promise<Out> {
		try {
			const result: boolean = await updateStatus(data);
			if (!result)
				return this.createErrorResponse(500, 'Internal server error!');

			return {
				status: 200,
				message: 'Status successfully updated',
				error: false,
				data: null,
			};
		} catch (error) {
			saveLog(
				`Services/application.updateStatus(e) => Error in updateStatus: ${JSON.stringify(error)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}

	public async deleteConfig(data: any): Promise<Out> {
		try {
			const result: boolean = await deleteConfig(data);
			if (!result)
				return this.createErrorResponse(500, 'Internal server error!');

			return {
				status: 200,
				message: 'Configuration successfully deleted',
				error: false,
				data: null,
			};
		} catch (error) {
			saveLog(
				`Services/application.deleteConfig(e) => Error in deleteConfig: ${JSON.stringify(error)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}

	public async addConfig(data: any): Promise<Out> {
		try {
			const result: boolean = await addConfig(data);
			if (!result)
				return this.createErrorResponse(500, 'Internal server error!');

			return {
				status: 200,
				message: 'Configuration successfully added',
				error: false,
				data: null,
			};
		} catch (error) {
			saveLog(
				`Services/application.addConfig(e) => Error in addConfig: ${JSON.stringify(error)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}
}

export default Application;
