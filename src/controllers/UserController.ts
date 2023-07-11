import { Request, Response } from 'express';

import Hash from '../utils/Hash';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/User';

interface StoreRequest extends IUser {
  password_confirmation: string;
}

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserRepository.findAll();
    response.status(200).json(users);
  }

  async store(request: Request, response: Response) {
    const { username, email, password, password_confirmation }: StoreRequest =
      request.body;

    if (!username) {
      return response.status(400).json({ error: 'Username is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    if (!(password === password_confirmation)) {
      return response
        .status(400)
        .json({ error: 'Password confirmation must be equal to password' });
    }

    const userAlreadyExists = await UserRepository.findByEmail(email);

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const hashOfPassword = Hash.passwordToHash(password);

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

  async updatePassword(request: Request, response: Response) {
    const { id } = request.params;
    const { currentPassword, newPassword } = request.body;

    const userFounded: IUser = await UserRepository.findById(id);

    if (!userFounded) {
      return response.status(400).json({ error: 'User not found' });
    }

    const isPasswordCorrect = Hash.comparePasswordWithHash(
      currentPassword,
      userFounded.password,
    );

    if (!isPasswordCorrect) {
      return response.status(401).json({ error: 'Not Authorized' });
    }

    await UserRepository.changePassword(
      { newPassword: Hash.passwordToHash(newPassword) },
      id,
    );
    response.sendStatus(200);
  }
}

export default new UserController();
