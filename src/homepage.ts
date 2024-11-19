import { Request, Response, NextFunction } from "express";

// ES6 Arrow Function for Homepage
const homePage = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send("<h1>Welcome to My Page!</h1><p>Enjoy exploring our API!</p>");
  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
};

export default homePage;