import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Hash from '../utils/Hash';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/User';

const secretKey = process.env.SECRET_KEY as string;

interface StoreRequest extends IUser {
  password_confirmation: string;
}

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserRepository.findAll();
    response.status(200).json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user: IUser = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found!' });
    }

    response.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
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

    const usernameInUse = await UserRepository.findByUsername(username);

    if (usernameInUse) {
      return response.status(400).json({ error: 'Username already in use' });
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
    const { username, email, description } = request.body;
    const { id } = request.params;

    const userUpdated: IUser = await UserRepository.update(
      {
        email,
        username,
        description,
      },
      id,
    );

    if (!userUpdated) {
      return response.status(404).json({ error: 'User not found!' });
    }

    const filtredUserFields = {
      username: userUpdated.username,
      email: userUpdated.email,
      description: userUpdated.description,
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

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const userFounded: IUser = await UserRepository.findByEmail(email);

    if (!userFounded) {
      return response.status(404).json({ error: 'User not exists' });
    }

    if (
      email === userFounded.email &&
      Hash.comparePasswordWithHash(password, userFounded.password)
    ) {
      const token = jwt.sign({ id: userFounded.id }, secretKey);
      response.status(200).json({ token, userId: userFounded.id });
    }

    response.status(401).json({ error: 'Invalid credentials' });
  }
}

export default new UserController();
