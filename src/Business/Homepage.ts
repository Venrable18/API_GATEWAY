import logger from '../lib/logger';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../abstraction/ApiError';
import { RouteDefinition } from '../types/RoutesDefinition';

export class myServices {
	public basePath = 'AlSh';

	public bisRoute(): RouteDefinition[] {
		return [
			{
				path: '/homepage',
				method: 'get',
				handler: this.homePage.bind(this),
			},
		];
	}

	/***
	 *
	 * @param req
	 *@param res
	 * @param next
	 */

	public homePage(req: Request, res: Response, next: NextFunction): void {
		try {
			res.send('This is the home page');
		} catch (error) {
			logger.error(error); // Log the error
			next(new ApiError('ApiError', StatusCodes.BAD_GATEWAY)); // Pass the error to the next middleware
		}
	}
}
