import { saveLog } from '../lib/Logger';
import { getAdmins as getAdminsFromDB } from '../Sql/admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface Admin {
	id: number;
	email: string;
	current_password: string;
	old_passwords?: string[];
	// Add other admin properties if necessary
}

interface Out {
	status: number;
	message: string;
	error: boolean;
	data: any;
}

class AdminService {
	async getAdmins(): Promise<Admin[] | false> {
		try {
			const admins = await getAdminsFromDB();
			return admins;
		} catch (error) {
			saveLog(
				`Services/admin.getAdmins(e) => Error in getAdmins: ${JSON.stringify(error)} || ${error}`,
				'error',
			);
			return false;
		}
	}

	async login(data: { email: string; password: string }): Promise<Out> {
		try {
			const { email, password } = data;

			if (!email) {
				return this.createErrorResponse(400, 'Email is required');
			}

			if (!password) {
				return this.createErrorResponse(400, 'Password is required');
			}

			const admins = await this.getAdmins();
			if (!admins) {
				return this.createErrorResponse(500, 'Error fetching admins');
			}

			const admin = admins.find(a => a.email === email);
			if (!admin) {
				return this.createErrorResponse(
					404,
					'No admin account available with this email',
				);
			}

			const isMatch = bcrypt.compareSync(
				String(password),
				String(admin.current_password),
			);
			if (!isMatch) {
				return this.createErrorResponse(401, 'Invalid password');
			}

			const payload = {
				id: admin.id,
				email: admin.email,
			};

			const token = jwt.sign(payload, 'keerthanaajay@123', {
				expiresIn: '1w',
			});

			const user = { ...admin };
			// @ts-ignore
			delete user.current_password;
			delete user.old_passwords;

			return {
				status: 200,
				message: 'Login successful',
				error: false,
				data: { token, ...user },
			};
		} catch (error) {
			saveLog(
				`Services/admin.login(e) => Error in login: ${JSON.stringify(error)} || ${error}`,
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

	async me(data: { token: string }): Promise<Out> {
		try {
			const { token } = data;

			if (!token) {
				return this.createErrorResponse(401, 'Token is required');
			}

			const decoded = jwt.verify(token, 'keerthanaajay@123');
			if (!decoded) {
				return this.createErrorResponse(401, 'Invalid token');
			}

			const admins = await this.getAdmins();
			if (!admins) {
				return this.createErrorResponse(500, 'Error fetching admins');
			}

			// @ts-ignore
			const admin = admins.find(a => a.email === decoded.email);
			if (!admin) {
				return this.createErrorResponse(
					404,
					'No admin account available with this id',
				);
			}

			const user = { ...admin };
			// @ts-ignore
			delete user.current_password;
			delete user.old_passwords;
			return {
				status: 200,
				message: 'User details',
				error: false,
				data: user,
			};
		} catch (error) {
			saveLog(
				`Services/admin.me(e) => Error in me: ${JSON.stringify(error)} || ${error}`,
				'error',
			);
			return this.createErrorResponse(500, 'Internal server error');
		}
	}
}

export default AdminService;
