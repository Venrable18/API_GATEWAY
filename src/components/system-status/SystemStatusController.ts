import { NextFunction, Request, Response } from 'express';
import * as process from 'process';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../abstraction/ApiError';
import BaseController from '../BaseController';
import {
	IServerTimeResponse,
	IResourceUsageResponse,
	IProcessInfoResponse,
	ISystemInfoResponse,
} from './SystemStatusTypes';
import { RouteDefinition } from '../../types/RoutesDefinition';

/**
 * Status Controller
 */

export default class SystemStatusController {
	// Base path
	public basePath: string = 'System';
	/**
	 *
	 *
	 */
}
