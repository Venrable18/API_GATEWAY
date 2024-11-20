import cors from "cors";
import express, { NextFunction } from "express";
import http from "http";
//import * as helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const helmet = require("helmet");
import dotenv from "dotenv";
import homePage from "./homepage";
dotenv.config();
import { sysRoute } from "./routes";
import { addErrorHandler } from "./middleware/error-handler";

export default class App {
  public express: express.Application;
  public httpServer: http.Server;

  constructor() {
    this.express = express();
    this.httpServer = http.createServer(
      this.express as unknown as http.RequestListener,
    );
  }

  public async init(): Promise<void> {
    const { NODE_ENV } = process.env;

    // add all the global middleware here
    this.middleware();

    // register all your routes
    this.routes();

    // add the middleware to handle error, make sure to add if after registering routes method
    this.express.use(addErrorHandler);

    // In a development/test environment, Swagger will be enabled.
    if (NODE_ENV && NODE_ENV !== "prod") {
      //this.setupSwaggerDocs();
    }
  }

  /**
   * here register all your routes
   */

  private routes(): void {
    this.express.get("/", this.basePathRoute);
    this.express.get("/web", this.parseRequestHeader, this.basePathRoute);
    this.express.get("/homepage", homePage);
    this.express.use("/", sysRoute());
  }

  private middleware(): void {
    this.express.use(helmet({ contentSecurityPolicy: true }));
    this.express.use(express.json({ limit: "100mb" }));
    this.express.use(express.urlencoded({ limit: "100mb", extended: true }));

    // add multiple cors options as per your use

    const corsOptions = {
      origin: ["http://localhost:3000", "http://localhost:8000"],
    };
    this.express.use(cors(corsOptions));
  }

  private basePathRoute(
    request: express.Request,
    response: express.Response,
  ): void {
    response.json({ message: "base path" });
  }

  private parseRequestHeader(
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ): void {
    //const accessToken = req.headers['access_token'] as string;
    // if (accessToken) {
    //     try {
    //         const decoded = jwt.verify(accessToken, 'your-secret-key'); // Replace with your secret key
    //         console.log('Decoded JWT:', decoded);
    //         // Optionally, attach the user information to the request object
    //         req.user = decoded; // Assuming decoded contains user info
    //     } catch (error) {
    //         console.error('Invalid token:', error);
    //         return res.status(401).send('Unauthorized');
    //     }
    // } else {
    //     console.log('No access token found in headers.');
    // }
    next();
  }

  /**
   * swagger setting class function
   */

  // private setupSwaggerDocs(): void {
  // 	this.express.use(
  // 		'/docs',
  // 		swaggerUi.serve,
  // 		swaggerUi.setup(swaggerDocument),
  // 	);
  // }
}

//http://localhost:8000/homepage
//http://localhost:8000/v1/system/getServerTime
