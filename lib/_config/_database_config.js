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
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = require("../lib/Logger");
require("dotenv/config");
class DB {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = process.env.MONGO_URL;
                // Exit the process with a non-zero status code if the URL is not provided
                if (!url) {
                    (0, Logger_1.log)(String('MongoDB URL not provided'.red.bold));
                    process.exit(1);
                }
                yield mongoose_1.default.connect(url);
                (0, Logger_1.log)(String('MongoDB database connection established successfully'.cyan.underline));
            }
            catch (err) {
                (0, Logger_1.saveLog)(String(`Error connecting to MongoDB: ${JSON.stringify(err)}`.red.bold), 'error');
                (0, Logger_1.log)(String(`Error connecting to MongoDB: ${JSON.stringify(err)}`.red.bold), 'error');
                process.exit(1);
            }
        });
    }
}
exports.default = DB;
