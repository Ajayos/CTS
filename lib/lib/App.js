"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
require("colors");
const Logger_1 = require("./Logger");
const index_1 = __importDefault(require("../Routes/index"));
class APP {
    constructor() {
        this.port = Number(process.env.PORT) || 1223;
        // Callback for when the server successfully starts
        this.onServerStart = () => {
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
            (0, Logger_1.log)(`{ message: 'Server started', port: '${this.port}', time: '${dateTime}' }`);
            (0, Logger_1.log)();
        };
        // Handle server startup errors, including port already in use
        this.onServerError = (error) => {
            if (error.code === 'EADDRINUSE') {
                (0, Logger_1.log)(`Port ${this.port} is already in use`, 'error');
                (0, Logger_1.saveLog)(`APP:class.onServerError().true => Server startup error: Port ${this.port} is already in use`, 'error');
                setTimeout(() => {
                    this.checkPortAvailability(this.port).then(available => {
                        if (available)
                            this.server.listen(this.port);
                        else
                            process.exit(1);
                    });
                }, 5000);
            }
            else {
                (0, Logger_1.log)(`Error starting server: ${JSON.stringify(error)}`, 'error');
                (0, Logger_1.saveLog)(`APP:class.onServerError().false => Server startup error: ${JSON.stringify(error)}`, 'error');
                process.exit(1);
            }
        };
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
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
    configureMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '10kb' }));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, helmet_1.default)());
    }
    // Set up cookies if not already present
    cookieSetUp() {
        this.app.use((req, res, next) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const cookieName = (_b = (_a = this.app.config) === null || _a === void 0 ? void 0 : _a.cookie) === null || _b === void 0 ? void 0 : _b.name;
            const cookieValue = (_d = (_c = this.app.config) === null || _c === void 0 ? void 0 : _c.cookie) === null || _d === void 0 ? void 0 : _d.value;
            // Check if the cookie is found in the request
            if (req.cookies && req.cookies[cookieName]) {
                console.log(`Cookie "${cookieName}" found. Proceeding.`);
                next();
            }
            else {
                // Cookie not found, set it
                res.cookie(cookieName, cookieValue, {
                    secure: ((_f = (_e = this.app.config) === null || _e === void 0 ? void 0 : _e.cookie) === null || _f === void 0 ? void 0 : _f.secure) || false,
                    httpOnly: ((_h = (_g = this.app.config) === null || _g === void 0 ? void 0 : _g.cookie) === null || _h === void 0 ? void 0 : _h.httpOnly) || false,
                    sameSite: ((_k = (_j = this.app.config) === null || _j === void 0 ? void 0 : _j.cookie) === null || _k === void 0 ? void 0 : _k.sameSite) || 'Lax',
                });
                console.log(`Cookie "${cookieName}" not found. Setting it now.`);
                next();
            }
        });
    }
    // Initialize server with routes and handling 404 errors
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(index_1.default);
            this.app.get('*', (req, res) => {
                res.redirect(301, 'https://ajayos.github.io/');
            });
            this.app.all('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
                return res.status(404).json({
                    message: 'Invalid route',
                    status: 404,
                    error: true,
                    data: null,
                });
            }));
            this.server
                .listen(this.port, this.onServerStart)
                .on('error', this.onServerError);
        });
    }
    // Check if the port is available before retrying the server startup
    checkPortAvailability(port) {
        return new Promise(resolve => {
            const server = (0, http_1.createServer)();
            server.once('error', (err) => {
                if (err.code === 'EADDRINUSE')
                    resolve(false);
                else
                    resolve(true);
            });
            server.once('listening', () => {
                server.close(() => resolve(true));
            });
            server.listen(port);
        });
    }
    // Close the server gracefully
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.server) === null || _a === void 0 ? void 0 : _a.close(() => {
                process.exit(1);
            }));
        });
    }
}
exports.default = APP;
