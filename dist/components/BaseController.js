"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const index_1 = __importDefault(require("../utils/index"));
const response_1 = require("express/lib/response");
/***
 * Base controller
 */
class BaseController {
    // Global method to send API responses;
    send(res, StatusCode = http_status_codes_1.StatusCodes.OK) {
        const encryptedData = index_1.default(res.locals.data);
        res.status(response_1.statusCode).send(encryptedData);
    }
    ;
}
exports.default = BaseController;
;
