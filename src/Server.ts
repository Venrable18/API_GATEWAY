import * as http from "http";
import { AddressInfo } from "net";
import { StatusCodes } from "http-status-codes";
import App from "./App";
import ApiError from "./abstraction/ApiError";
import logger from "./lib/logger";

const app: App = new App();

function serverError(err: NodeJS.ErrnoException) {
  if (err.syscall !== "Listening") {
    logger.error("unexpected error during server startup", err);
    throw err;
  }
  throw new ApiError("Syscall error", StatusCodes.CONFLICT);
}

const server = http.createServer(app.express);

(async () => {
  try {
    await app.init();
    const port = 8000;
    app.express.set("port", port);

    server.on("error", serverError);
    server.listen(port, () => {
      const addressInfo: AddressInfo = server.address() as AddressInfo;
      logger.info(
        `Server listening on http://${addressInfo.address}:${addressInfo.port}`,
      );
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.name);
      logger.error(err.message);
      logger.error(err.stack);
    } else {
      logger.error("An unknown error occurred:", err);
    }
  }

  process.on("unhandledRejection", (reason: Error) => {
    logger.error("Unhandled Promise Rejection: reason:", reason.message);
    logger.error(reason.stack);
    // application specific logging, throwing an error, or other logic here
    server.close(() => {
      process.exit(1);
    });
  });
})();
