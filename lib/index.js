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
const cluster_1 = __importDefault(require("cluster"));
const App_1 = __importDefault(require("./lib/App"));
const Logger_1 = require("./lib/Logger");
const os_1 = __importDefault(require("os"));
const _database_config_1 = __importDefault(require("./_config/_database_config"));
// Start the server and the scheduler
if (cluster_1.default.isPrimary) {
    const numCPUs = os_1.default.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', worker => {
        cluster_1.default.fork();
    });
}
else {
    class CTS extends App_1.default {
        constructor() {
            super();
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                yield _database_config_1.default.connect();
                this.init();
            });
        }
        stop() {
            return __awaiter(this, void 0, void 0, function* () {
                this.close();
            });
        }
    }
    const cts = new CTS();
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield cts.start();
                    resolve(true);
                }
                catch (err) {
                    (0, Logger_1.saveLog)(`main(e) => Error starting server ${JSON.stringify(err)} || ${err}`, 'e');
                    reject(err);
                }
            }));
        });
    }
    process.on('unhandledRejection', (err) => __awaiter(void 0, void 0, void 0, function* () {
        (0, Logger_1.log)(err, 'e');
        (0, Logger_1.saveLog)(`UNHANDLED REJECTION! ${err.stack || err.toString()}`, 'e');
        (0, Logger_1.log)('UNHANDLED REJECTION! Shutting down ...', 'w');
        yield cts.stop();
    }));
    process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
        (0, Logger_1.log)(err, 'e');
        (0, Logger_1.saveLog)(`UNCAUGHT Exception! ${err.stack || err.toString()}`, 'e');
        (0, Logger_1.log)('UNCAUGHT Exception! Shutting down ...', 'w');
        yield cts.stop();
    }));
    Promise.all([main()]).catch(err => {
        (0, Logger_1.saveLog)(`Error starting server ${JSON.stringify(err)} || ${err}`, 'e');
        (0, Logger_1.log)(err.toString(), 'e');
    });
    // Suppress specific deprecation warnings
    process.emitWarning = (warning, type) => __awaiter(void 0, void 0, void 0, function* () {
        if (type === 'DeprecationWarning') {
            return;
        }
        yield (0, Logger_1.saveLog)(`process:emitWarning ${warning.toString()} `, 'w');
        (0, Logger_1.log)(warning.toString(), 'w');
    });
    // Handle process exit event
    process.on('exit', () => __awaiter(void 0, void 0, void 0, function* () {
        //
    }));
    // Handle SIGINT (Ctrl + C) signal
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, Logger_1.log)('SIGINT received', 'i');
        yield cts.stop();
        process.exit(0);
    }));
}
