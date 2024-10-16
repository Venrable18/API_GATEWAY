import { NextFunction, Request, Response } from 'express';
import * as os from 'os';
import * as process from 'process';
import { StatusCodes } from "http-status-codes";
import ApiError from '../../abstraction/ApiError';
import BaseController from '../BaseController';
import { IServerTimeResponse, IResourceUsageResponse, IProcessInfoResponse, ISystemInfoResponse } from './SystemStatusTypes';
import {RouteDefinition} from '../../types/RoutesDefinition';

/**
 * Status Controller
 */




	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	
