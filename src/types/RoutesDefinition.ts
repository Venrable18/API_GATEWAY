import { Request, Response, NextFunction } from 'express';


export interface RouteDefinition {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  handler: (res: Response,  req: Request, next: NextFunction) => void;
};