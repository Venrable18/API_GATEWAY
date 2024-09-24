import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RouteDefinition } from "../types/RoutesDefinition";
import  getEncryptedText from "../utils/index";
import { statusCode } from "express/lib/response";

/***
 * Base controller
 */


export default abstract class BaseController {
public abstract routes(): RouteDefinition[];

  // Global method to send API responses;

public send(res: Response, StatusCode: number = StatusCodes.OK): void {
  const encryptedData = getEncryptedText(res.locals.data);
  res.status(statusCode).send(encryptedData);
};

};