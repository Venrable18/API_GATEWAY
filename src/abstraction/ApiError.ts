export interface IError {
  status: number;
  fields: {
      name: {
          message: string;
      };
  };
  message: string;
  name: string;
}

class ApiError extends Error implements IError {
  public status: number;
  public fields: { name: { message: string } };
  public success = false;

  constructor(msg: string, statusCode: number, name = 'ApiError') {
      super(msg); // Pass the message to the Error constructor
      this.status = statusCode;
      this.name = name;

      // Initialize fields to ensure it matches IError interface
      this.fields = {
          name: {
              message: msg,
          },
      };
  }
}

export default ApiError;
