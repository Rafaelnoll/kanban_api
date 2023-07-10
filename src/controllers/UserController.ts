import { Request, Response } from 'express';

import UserRepository from '../repositories/UserRepository';

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserRepository.findAll();
    response.status(200).json(users);
  }
}

export default new UserController();
