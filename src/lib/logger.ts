// import * as fs from 'fs';
// import * as path from 'path';
// import winston from 'winston';

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


import { existsSync,mkdirSync } from "fs";
import { Logger } from "winston";
import winston  from "winston";

const logDir = './logs';

if(!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logger: Logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/combined.log`
    })
  ],
});

export default logger