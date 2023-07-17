import { Request } from 'express';
import IJWTUser from '../interfaces/JWTUser';

declare global {
  namespace Express {
    interface Request {
      user: IJWTUser;
    }
  }
}
