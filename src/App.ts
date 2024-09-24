import cors from 'cors';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import 'dotenv/config';
import addErrorHandler from './middleware/error-handler'

export default class App {
  public express: express.Application;
  public httpServer: http.Server;
}

