import * as http from 'http';
import { AddressInfo } from 'net';
 import App from './App';
import logger from './lib/logger';


const app: App = new App();

function serverError(err: NodeJS.ErrnoException) {
  if (err.syscall !== 'Listening') {
    throw new Error(" server error", );
    
  }
}