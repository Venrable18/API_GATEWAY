import * as http from "http";
import { AddressInfo } from "net";
import { StatusCodes } from "http-status-codes";
import App from "./App";
import ApiError from "./abstraction/ApiError";
import logger from "./lib/logger";

const app: App = new App();

function serverError(err: NodeJS.ErrnoException) {
  if (err.syscall !== "Listening") {
    throw err;
  }
  throw new ApiError("Syscall error", StatusCodes.CONFLICT);
}

(async () => {
  try {
    await app.init();
    const port = 4000;
    app.express.set("port", port);

    const server = http.createServer();
    server.on("error", serverError);
    server.listen(port, () => {
      const addressInfo = server.address() as AddressInfo;
      const { address, port } = addressInfo;
      logger.info(`Server listening on ${address}:${port}`);
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
  });
})();