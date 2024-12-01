import { Request, Response, NextFunction } from "express";
import BaseController from "../../components/BaseController";
import { RouteDefinition } from "../../types/RoutesDefinition";
import { StatusCodes } from "http-status-codes";

export default class UserController extends BaseController {
  //base path
  public basePath = "user";

  /**
   * User routes
   */
  public routes(): RouteDefinition[] {
    return [
      {
        path: "/getuser",
        method: "get",
        handler: this.getUser.bind(this),
      },

      // These are the examples added here to follow if we need to create a different type of HTTP method.
      //{ path: '/', method: 'post', handler: this.getError.bind(this) },
      //{ path: '/', method: 'put', handler: this.getError.bind(this) },
      //{ path: '/', method: 'patch', handler: this.getError.bind(this) },
      //{ path: '/', method: 'delete', handler: this.getError.bind(this) },
    ];
  }

  /**
   * Gets user
   * @param req 
   * @param res 
   * @param next 
   */
  public getUser(req: Request, res: Response, next: NextFunction): void {
    try {
      // simulate fetching data from a database
      const userData = {
        username: "John Doe",
        email: "johndoe@gmail.com",
        address: "123 Main Street",
      };

      //Attach the data to res.locals
      res.locals.data = userData;

      // send encrypted response using BaseController's send method;
      super.send(res, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}
