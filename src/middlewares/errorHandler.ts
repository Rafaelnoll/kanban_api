/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(error);
  response.sendStatus(500);
}

export default errorHandler;
