"use strict";
// import * as fs from 'fs';
// import * as path from 'path';
// import winston from 'winston';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const logDir = path.resolve(__dirname, 'log'); // Use absolute path to avoid path issues
// // Ensure the log directory exists
// try {
//     if (!fs.existsSync(logDir)) {
//         fs.mkdirSync(logDir, { recursive: true });
//         console.log(`Log directory created at ${logDir}`);
//     } else {
//         console.log(`Log directory already exists at ${logDir}`);
//     }
// } catch (err) {
//     console.error(`Failed to create log directory: ${err.message}`);
//     throw err; // Rethrow the error if directory creation fails
// }
// const logger: winston.Logger = winston.createLogger({
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//     ),
//     transports: [
//         new winston.transports.Console({
//             format: winston.format.combine(
//                 winston.format.colorize(),
//                 winston.format.simple()
//             ),
//         }),
//         new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
//     ],
// });
// // Test logging
// try {
//     logger.info('Logger initialized successfully');
//     logger.error('This is a test error message');
// } catch (err) {
//     console.error(`Logging test failed: ${err.message}`);
// }
// export default logger;
const fs_1 = require("fs");
const winston_1 = __importDefault(require("winston"));
const logDir = './logs';
if (!fs_1.existsSync(logDir)) {
    fs_1.mkdirSync(logDir);
}
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: `${logDir}/combined.log`
        })
    ],
});
exports.default = logger;
