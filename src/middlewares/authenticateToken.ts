import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import IJWTUser from '../interfaces/JWTUser';

const secretKey = process.env.SECRET_KEY as string;

function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.headers['authorization']?.split(' ')[1];

  if (token === null) {
    return response.status(401).json({ error: 'Login required' });
  }

  jwt.verify(token as string, secretKey, (error, user) => {
    if (error) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    request.user = user as IJWTUser;
    next();
  });
}

export default authenticateToken;
