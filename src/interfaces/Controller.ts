import { Request, Response } from 'express';

export default interface Controller {
  index(request: Request, response: Response): void;
  show(request: Request, response: Response): void;
  store(request: Request, response: Response): void;
  update(request: Request, response: Response): void;
  delete(request: Request, response: Response): void;
}
