import logger from "./lib/logger";
import { Router } from "express";
import { RouteDefinition } from "./types/RoutesDefinition";
import SystemStatusController from "./components/system-status/SystemStatusController";

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

export function sysCheckingRoute() {
  try {
    const router = Router();

    // instantiated systemStatus route

    const SystemControllers: SystemStatusController[] = [
      new SystemStatusController(),
    ];

    SystemControllers.forEach((SystemController) =>
      router.use(
        `/v1/${SystemController.basePath}`,
        registerControllerRoutes(SystemController.routes()),
      ),
    );
    return router;
  } catch (error) {
    logger.error("Unable to get SystemStatus through this route", error);
    throw error;
  }
}

// export function bizRoutes() {
//   try {
//     const router = Router();

//     // Here is where my business route is instantiated
//     const bCtrl: myServicesController[] = [new myServicesController()];

//     bCtrl.forEach((Ctrl) => {
//       router.use(
//         `/${Ctrl.basePath}`,
//         registerControllerRoutes(Ctrl.bisRoute()),
//       );
//     });
//     return router;
//   } catch (error) {
//     logger.error("Unable to register the route", error);
//     throw error;
//   }
// }
