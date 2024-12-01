import { Request, Response, NextFunction } from "express";
import logger from "./lib/logger";
import { StatusCodes } from "http-status-codes";
import ApiError from "./abstraction/ApiError";


/**
 * @openapi
 * /Homepage:
 *    get:
 *      tag:
 *        - Homepage
 */
const homePage = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("This is the home page");
  } catch (error) {
    logger.error(error); // Log the error
    next(new ApiError("ApiError", StatusCodes.BAD_GATEWAY)); // Pass the error to the next middleware
  }
};

export default homePage;
