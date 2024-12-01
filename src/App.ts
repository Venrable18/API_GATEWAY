import cors from "cors";
import express, { NextFunction } from "express";
import http from "http";
//import * as helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const helmet = require("helmet");
import logger from "./lib/logger";
import dotenv from "dotenv";
import swaggerSpec from "./utils/swagger";
import swaggerUi from "swagger-ui-express";
import homePage from "./homepage";
import { sysCheckingRoute } from "./routes";
import { userCheckingRoute } from "./routes";
import { addErrorHandler } from "./middleware/error-handler";

dotenv.configDotenv();

export default class App {
  public express: express.Application;
  public httpServer: http.Server;

  constructor() {
    this.express = express();
    this.httpServer = http.createServer(
      this.express as unknown as http.RequestListener,
    );
  }
/**
 * Inits app
 * @returns init 
 */
public async init(): Promise<void> {
    const { NODE_ENV } = process.env;

    
    this.middleware();

    // register all your routes
    this.routes();

    // add the middleware to handle error, make sure to add if after registering routes method
    this.express.use(addErrorHandler);

    // In a development/test environment, Swagger will be enabled.
    if (NODE_ENV && NODE_ENV !== "prod") {
      this.setupSwaggerDocs();
    }
  }


/**
 * Routes app
 */
private routes(): void {
    this.express.get("/", this.basePathRoute);
    this.express.get("/web", this.parseRequestHeader, this.basePathRoute);
    this.express.get("/homepage", homePage);
    this.express.use("/", sysCheckingRoute());
    this.express.use("/", userCheckingRoute());
  }
  
// Middlewares app
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

  private setupSwaggerDocs(): void {
    // swagger page
    this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Generating raw swagger Json on /swagger;

    this.express.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec); // send the generated swagger JSON;
    });
    logger.info(`Swagger is running on http://localhost:8080/docs`)
  }
}

//http://localhost:8080/homepage
//http://localhost:8080/docs
//http://localhost:8000/swagger.json
//http://localhost:8000/v1/system/process
//http://localhost:8080/v1/system/usage
//http://localhost:8080/v1/system/error
//http://localhost:8080/v1/system/time
//http://localhost:8000/v1/system/info
//http://localhost:8080/v1/user/getuser
