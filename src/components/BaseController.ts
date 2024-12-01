import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RouteDefinition } from "../types/RoutesDefinition";
import getEncryptedText from "../utils/index";

/***
 * Base controller
 */

export default abstract class BaseController {
  public abstract routes(): RouteDefinition[];

  // Global method to send API responses;
  // Encrypt the response data
  public send(res: Response, StatusCode: number = StatusCodes.OK): void {
    try {
      const encryptedData = getEncryptedText(res.locals.data);
      res.status(StatusCode).send({ data: encryptedData });
    } catch (error) {
      // for case of error send an internal server error
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: " Error encrypting data", error });
    }
  }
}
