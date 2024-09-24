"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(msg, statusCode, name = 'ApiError') {
        super(msg); // Pass the message to the Error constructor
        this.success = false;
        this.status = statusCode;
        this.name = name;
        // Initialize fields to ensure it matches IError interface
        this.fields = {
            name: {
                message: msg,
            },
        };
    }
}
exports.default = ApiError;
