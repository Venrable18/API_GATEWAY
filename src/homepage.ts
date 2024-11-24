import { Request, Response } from "express";

/**
 * @openapi
 * /homepage:
 *  get:
 *    description: This is the homepage
 *    responses:
 *      200:
 *       description: Homepage fully displayed
 */

const homePage = (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Homepage!" });
};

export default homePage;
