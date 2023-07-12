import { Request, Response, NextFunction } from 'express';

function verifyUser(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;

  if (!request.user) {
    throw new Error(
      'Middleware "verifyUser" must be used after the middleware "authenticateToken"',
    );
  }

  if (!(request.user?.id === id)) {
    return response.status(403).json({ error: 'Permission denied' });
  }

  next();
}

export default verifyUser;
