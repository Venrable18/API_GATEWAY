"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("util"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_1 = __importDefault(require("../lib/logger"));
const addErrorHandler = (err, req, res, next) => {
    if (err) {
        const status = err.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR;
        logger_1.default.debug(`REQUEST HANDLING ERROR:
      \nERROR:\n${JSON.stringify(err)}
      \nREQUEST HEADERS:\n${util.inspect(req.headers)},
      \nREQUEST PARAMS:\n${util.inspect(req.params)},
      \nREQUEST QUERY:\n${util.inspect(req.query)}`);
        const body = {
            fields: err.fields,
            message: err.message || 'An error occurred during the request',
            name: err.name,
            status,
        };
        res.status(status);
        res.send(body);
    }
    next();
};
exports.default = addErrorHandler;
