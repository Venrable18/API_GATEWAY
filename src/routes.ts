import logger from './lib/logger';
import { Router } from 'express';
import { RouteDefinition } from './types/RoutesDefinition';
import { myServices } from './business/Homepage';

function registerControllerRoutes(routes: RouteDefinition[]): Router {
	const controllerRouter = Router();

	routes.forEach((route) => {
		switch (route.method) {
			case 'get':
				controllerRouter.get(route.path, route.handler);
				break;

			case 'post':
				controllerRouter.post(route.path, route.handler);
				break;

			case 'put':
				controllerRouter.put(route.path, route.handler);
				break;

			case 'patch':
				controllerRouter.patch(route.path, route.handler);
				break;

			case 'delete':
				controllerRouter.delete(route.path, route.handler);
				break;
			default:
				throw new Error(`Unsupported HTTP method: ${route.method}`);
		}
	});
	return controllerRouter;
}

function bizRoutes() {
	try {
		const router = Router();

		// Here is where my business route is instantiated
		const bCtrl: myServices[] = [new myServices()];

		bCtrl.forEach((Ctrl) => {
			router.use(
				`/v1/${Ctrl.basePath}`,
				registerControllerRoutes(Ctrl.bisRoute()),
			);
		});
		return router;
	} catch (error) {
		logger.error('Unable to register the route', error);
		throw error;
	}
}

export default bizRoutes;
