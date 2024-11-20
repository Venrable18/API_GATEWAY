import { Request, Response } from "express";

const homePage = (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Homepage!" });
};

export default homePage;
