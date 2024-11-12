import { NextFunction, Request, Response } from "express";
import * as os from "os";
import * as process from "process";
import StatusCodes from "http-status-codes";
import ApiError from "../../abstraction/ApiError";
import BaseController from "../BaseController";
import {
  ISystemInfoResponse,
  IResourceUsageResponse,
  IProcessInfoResponse,
  INodeJsNetworkInterfaceInfo,
  IServerTimeResponse,
} from "./SystemStatusTypes";
import { RouteDefinition } from "../../types/RoutesDefinition";

/**
 * Status controller
 */
export default class SystemStatusController extends BaseController {
  // base path
  public basePath = "system";

  /**
   * Define routes
   */
  public routes(): RouteDefinition[] {
    return [
      {
        path: "/info",
        method: "get",
        handler: this.getSystemInfo.bind(this),
      },
      {
        path: "/time",
        method: "get",
        handler: this.getServerTime.bind(this),
      },
      {
        path: "/usage",
        method: "get",
        handler: this.getResourceUsage.bind(this),
      },
      {
        path: "/process",
        method: "get",
        handler: this.getProcessInfo.bind(this),
      },
      {
        path: "/error",
        method: "get",
        handler: this.getError.bind(this),
      },
    ];
  }

  /**
   * Get system information
   */
  public getSystemInfo(req: Request, res: Response, next: NextFunction): void {
    try {
      const networkInfo = os.networkInterfaces();
      const network: { [index: string]: INodeJsNetworkInterfaceInfo[] } = {};

      Object.keys(networkInfo).forEach((interfaceName) => {
        const interfaces = networkInfo[interfaceName];
        if (interfaces) {
          network[interfaceName] = interfaces as INodeJsNetworkInterfaceInfo[];
        }
      });

      const response: ISystemInfoResponse = {
        cpus: os.cpus(),
        network: network,
        os: {
          platform: process.platform,
          version: os.release(),
          totalMemory: os.totalmem(),
          uptime: os.uptime(),
        },
        currentUser: os.userInfo(),
      };

      res.locals.data = response;
      super.send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get server time
   */
  public getServerTime(req: Request, res: Response, next: NextFunction): void {
    try {
      const now: Date = new Date();
      const utc: Date = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000,
      );
      const time: IServerTimeResponse = {
        utc,
        date: now,
      };
      res.locals.data = time;
      super.send(res);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get resource usage
   */
  public getResourceUsage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    try {
      const totalMem: number = os.totalmem();
      const memProc: NodeJS.MemoryUsage = process.memoryUsage();
      const freemMem: number = os.freemem();

      const response: IResourceUsageResponse = {
        processMemory: memProc,
        systemMemory: {
          free: freemMem,
          total: totalMem,
          percentFree: Math.round((freemMem / totalMem) * 100),
        },
        processCpu: process.cpuUsage(),
        systemCpu: os.cpus(),
      };

      res.locals.data = response;
      super.send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get process information
   */
  public getProcessInfo(req: Request, res: Response, next: NextFunction): void {
    try {
      const response: IProcessInfoResponse = {
        procCpu: process.cpuUsage(),
        memUsage: process.memoryUsage(),
        env: process.env,
        pid: process.pid,
        uptime: process.uptime(),
        applicationVersion: process.version,
        nodeDependencyVersions: process.versions,
      };
      res.locals.data = response;
      super.send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Example error route
   */
  public getError(req: Request, res: Response, next: NextFunction): void {
    try {
      throw new ApiError("An error occurred", StatusCodes.BAD_REQUEST);
    } catch (error) {
      next(error);
    }
  }
}
