import { Request, Response } from 'express';

import HashGenetator from '../utils/HashGenetator';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/User';

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserRepository.findAll();
    response.status(200).json(users);
  }

  async store(request: Request, response: Response) {
    const { username, email, password }: IUser = request.body;

    if (!username) {
      return response.status(400).json({ error: 'Username is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const userAlreadyExists = await UserRepository.findByEmail(email);

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const hashOfPassword = HashGenetator.passwordToHash(password);

    await UserRepository.create({
      username,
      email,
      password: hashOfPassword,
    });

    response.sendStatus(204);
  }

  async update(request: Request, response: Response) {
    const { username, email } = request.body;
    const { id } = request.params;

    const userUpdated: IUser = await UserRepository.update(
      {
        email,
        username,
      },
      id,
    );

    if (!userUpdated) {
      return response.status(404).json({ error: 'User not found!' });
    }

    const filtredUserFields = {
      username: userUpdated.username,
      email: userUpdated.email,
    };

    response.status(201).json(filtredUserFields);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await UserRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new UserController();
