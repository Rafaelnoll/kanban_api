import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Hash from '../utils/Hash';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/User';
import { deleteOldProfileImage } from '../utils/upload';

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
      return response.status(404).json({ error: 'Usuário não encontrado!' });
    }

    response.status(200).json(user);
  }

  async store(request: Request, response: Response) {
    const { username, email, password, password_confirmation }: StoreRequest =
      request.body;

    if (!username) {
      return response.status(400).json({ error: 'Username é obrigatório!' });
    }

    if (!email) {
      return response.status(400).json({ error: 'E-mail é obrigatório!' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Senha é obrigatória!' });
    }

    if (!(password === password_confirmation)) {
      return response
        .status(400)
        .json({ error: 'A confirmação da senha deve ser igual à senha!' });
    }

    const userAlreadyExists = await UserRepository.findByEmail(email);

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'Usuário já existe!' });
    }

    const usernameInUse = await UserRepository.findByUsername(username);

    if (usernameInUse) {
      return response.status(400).json({ error: 'Nome de usuário já em uso!' });
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
      return response.status(404).json({ error: 'Usuário não encontrado!' });
    }

    response.status(201).json(userUpdated);
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
      return response.status(400).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordCorrect = Hash.comparePasswordWithHash(
      currentPassword,
      userFounded.password,
    );

    if (!isPasswordCorrect) {
      return response.status(401).json({ error: 'Não autorizado!' });
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
      return response.status(404).json({ error: 'Usuário não existe!' });
    }

    if (
      email === userFounded.email &&
      Hash.comparePasswordWithHash(password, userFounded.password)
    ) {
      const token = jwt.sign({ id: userFounded.id }, secretKey);
      response.status(200).json({ token, userId: userFounded.id });
    }

    response.status(401).json({ error: 'Credenciais inválidas!' });
  }

  async changeProfilePicture(request: Request, response: Response) {
    const file = request.file;
    const user = request.user;

    if (!file) {
      return response.status(400).json({ error: 'Imagem é obrigatória' });
    }

    const userFounded: IUser = await UserRepository.findById(user.id);

    if (userFounded.image_path) {
      deleteOldProfileImage(userFounded.image_path);
    }

    const userWithNewImageProfile = await UserRepository.changeProfileImage(
      { imagePath: file?.filename },
      user.id,
    );

    response.status(200).json(userWithNewImageProfile);
  }
}

export default new UserController();
