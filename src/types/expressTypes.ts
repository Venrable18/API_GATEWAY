import { Request } from 'express';

// Define a type for your body
interface MyRequestBody {
  [key: string]: any; // You can be more specific if you know the structure
}

// Extend the Request interface
interface CustomRequest extends Request {
  body: MyRequestBody;
}

export default customElements;