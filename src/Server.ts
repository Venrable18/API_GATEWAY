import * as http from 'http';
import { AddressInfo } from 'net';
import { StatusCodes } from 'http-status-codes';
import App from './App';
import ApiError from './abstraction/ApiError';
import logger from './lib/logger';

const app: App = new App();

function serverError(err: NodeJS.ErrnoException) {
	if (err.syscall !== 'Listening') {
		throw err;
	}
	throw new ApiError('Syscall error', StatusCodes.CONFLICT);
}

function serverListening(): void {
	const server = http.createServer();
	const addressInfo = (server.address() as AddressInfo) || null;

	if (addressInfo) {
		const { address, port } = addressInfo;
		logger.info(`listening on ${address}:${port}`);
	} 
}

(async () => {
	try {
		await app.init();
		const port = process.env.PORT;
		app.express.set('port', port);

		const server = app.httpServer;
		server.on('error', serverError);
		server.on('listening', serverListening);
		server.listen(port, () => {
			logger.info(`Server listening on ${port}`);
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			logger.error(err.name);
			logger.error(err.message);
			logger.error(err.stack);
		} else {
			logger.error('An unknown error occurred:', err);
		}
	}

	process.on('unhandledRejection', (reason: Error) => {
		logger.error('Unhandled Promise Rejection: reason:', reason.message);
		logger.error(reason.stack);
		// application specific logging, throwing an error, or other logic here
	});
})();
