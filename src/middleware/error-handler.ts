import * as util from "util";
import * as express from "express";
import statusCodes from "http-status-codes";
import ApiError, { IError } from "../abstraction/ApiError";
import logger from "../lib/logger";

const addErrorHandler = (
  err: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (err) {
    const status: number = err.status || statusCodes.INTERNAL_SERVER_ERROR;
    logger.debug(`REQUEST HANDLING ERROR:
      \nERROR:\n${JSON.stringify(err)}
      \nREQUEST HEADERS:\n${util.inspect(req.headers)},
      \nREQUEST PARAMS:\n${util.inspect(req.params)},
      \nREQUEST QUERY:\n${util.inspect(req.query)}`);

    const body: IError | string = {
      fields: err.fields,
      message: err.message || "An error occurred during the request",
      name: err.name,
      status,
    };
    res.status(status);
    res.send(body);
  }
  next();
};

export { addErrorHandler };
