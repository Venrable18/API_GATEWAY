import * as fs from 'fs';
import * as path from 'path';
import winston, { Logger } from 'winston';

const logDir = path.resolve(__dirname, '../log'); // Use absolute path to avoid path issues

// Ensure the log directory exists
try {
	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir, { recursive: true });
		console.log(`Log directory created at ${logDir}`);
	} else {
		console.log(`Log directory already exists at ${logDir}`);
	}
} catch (err) {
	console.error(
		`Failed to create log directory: ${err instanceof Error ? err.message : 'Unknown error'}`,
	);
	throw err; // Rethrow the error if directory creation fails
}

// Create and export the logger
const logger: Logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(logDir, 'combined.log'),
		}),
	],
});

export default logger;



// import * as winston from 'winston';

// const logDir = './log';

// export type Logger = winston.Logger;

// const logger: Logger = winston.createLogger({
// 	format: winston.format.json(),
// 	transports: [
// 		new winston.transports.Console(),
// 		new winston.transports.File({ filename: `${logDir}` }),
// 	],
// });

// export default logger;
