import { Request, Response } from "express";

/**
 * @openapi
 * /homePage:
 *   get:
 *     description: This is the homepage!
 *     responses:
 *       200:
 *         description: Returns homepage is available for display.
 */
const homePage = (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Homepage!" });
};

export const checkingPath = 'show me thy secret';

export default homePage;