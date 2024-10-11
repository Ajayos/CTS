import 'express';

declare module 'express' {
	interface Application {
		config?: {
			cookie?: {
				name: string;
				value: string;
				secure?: boolean;
				httpOnly?: boolean;
				sameSite?: 'Lax' | 'Strict' | 'None';
			};
		};
	}
}
