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
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../lib/Logger");
/**
 * Handles the response from a promise and sends it as a JSON response.
 *
 * @param promise - The promise to handle the response from.
 * @param res - The response object to send the JSON response to.
 * @returns A JSON response based on the output of the promise.
 *
 * @example
 * // Assuming `promise` is a promise that resolves to an object with `status` and `error` properties
 * const response = await handleResponse(promise, res);
 * // The response will be sent as a JSON response to the `res` object.
 */
const handleResponse = (promise, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const output = yield promise;
        const { status, error } = output;
        if (error) {
            (0, Logger_1.saveLog)(`src/util/handleResponse:handleResponse() => ${output.message} `, 'e');
            return res.status(status).json(output);
        }
        return res.status(status).json(output);
    }
    catch (error) {
        (0, Logger_1.saveLog)(`src/util/handleResponse:handleResponse(e) => ${JSON.stringify(error)} || ${error}`, 'e');
        return res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            data: error.message || null,
        });
    }
});
exports.default = handleResponse;
