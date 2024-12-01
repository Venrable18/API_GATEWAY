import logger from "./lib/logger";
import { Router } from "express";
import { RouteDefinition } from "./types/RoutesDefinition";
import SystemStatusController from "./components/system-status/SystemStatusController";
import UserController from "./business/Users/userController";

function registerControllerRoutes(routes: RouteDefinition[]): Router {
  const controllerRouter = Router();

  routes.forEach((route) => {
    switch (route.method) {
      case "get":
        controllerRouter.get(route.path, route.handler);
        break;

      case "post":
        controllerRouter.post(route.path, route.handler);
        break;

      case "put":
        controllerRouter.put(route.path, route.handler);
        break;

      case "patch":
        controllerRouter.patch(route.path, route.handler);
        break;

      case "delete":
        controllerRouter.delete(route.path, route.handler);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${route.method}`);
    }
  });
  return controllerRouter;
}


/**
 * Sys checking route
 * @returns  
 */
export function sysCheckingRoute() {
  try {
    const router = Router();

    // Define an array of controller objects

    const SystemControllers: SystemStatusController[] = [
      new SystemStatusController(),
    ];

    // Dynamically register routes for each controller

    SystemControllers.forEach((SystemController) =>
      // make sure each controller has basePath attribute and routes() method
      router.use(
        `/v1/${SystemController.basePath}`,
        registerControllerRoutes(SystemController.routes()),
      ),
    );
    return router;
  } catch (error) {
    logger.error("Unable to get SystemStatus route", error);
    throw error;
  }
}


/**
 * Users checking route
 * @returns  
 */
export function userCheckingRoute() {
  try {
    const router = Router();

    // Define an array of controller objects

    const usrControllers: UserController[] = [new UserController()];

    // Dynamically register routes for each controller

    usrControllers.forEach((usrController) =>
      // make sure each controller has basePath attribute and routes() method
      router.use(
        `/v1/${usrController.basePath}`,
        registerControllerRoutes(usrController.routes()),
      ),
    );
    return router;
  } catch (error) {
    logger.error("Unable to get user route", error);
    throw error;
  }
}
