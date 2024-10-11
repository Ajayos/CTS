import { Application } from 'express';
import { Server } from 'http';
import 'dotenv/config';
import 'colors';
declare class APP {
    server: Server;
    app: Application & {
        config?: any;
    };
    port: number;
    constructor();
    private configureMiddleware;
    private cookieSetUp;
    init(): Promise<void>;
    private onServerStart;
    private onServerError;
    private checkPortAvailability;
    close(): Promise<void>;
}
export default APP;
