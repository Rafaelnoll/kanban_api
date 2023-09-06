import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Hash from '../utils/Hash';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/User';
import { deleteOldProfileImage } from '../utils/upload';
import Password from '../utils/Password';
import { sendResetPasswordEmail } from '../utils/sendResetPasswordEmail';

const secretKey = process.env.SECRET_KEY as string;

interface StoreRequest extends IUser {
  password_confirmation: string;
}

interface JwtPayload {
  id: string;
}

interface ResetUserRequest {
  new_password: string;
  new_password_confirmation: string;
  token: string;
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

    const filtredUserFields = {
      id: user.id,
      username: user.username,
      email: user.email,
      description: user.description,
      image_path: user.image_path,
    };

    response.status(200).json(filtredUserFields);
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

    if (!Password.comparePasswords(password, password_confirmation)) {
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
    const { current_password, new_password } = request.body;

    if (!Password.validatePasswordWithRegex(new_password)) {
      return response.status(400).json({ error: 'Senha inválida!' });
    }

    const userFounded: IUser = await UserRepository.findById(id);

    if (!userFounded) {
      return response.status(404).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordCorrect = Hash.comparePasswordWithHash(
      current_password,
      userFounded.password,
    );

    if (!isPasswordCorrect) {
      return response.status(401).json({ error: 'Não autorizado!' });
    }

    await UserRepository.changePassword(
      { newPassword: Hash.passwordToHash(new_password) },
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

  async sendEmailToResetPassword(request: Request, response: Response) {
    const { email } = request.body;

    const userFound = (await UserRepository.findByEmail(email)) as IUser;

    if (!userFound) {
      return response.status(404).json({ error: 'E-mail não encontrado!' });
    }

    const userToken = jwt.sign({ id: userFound.id }, secretKey);

    const emailSended = await sendResetPasswordEmail({
      emailTo: email,
      username: userFound.username,
      url_reset_password: `http://localhost:8080/reset-password?token=${userToken}`,
    });

    if (emailSended) {
      return response.status(200).json({ msg: 'E-mail enviado com sucesso!' });
    }

    response.sendStatus(500);
  }

  async resetUserPassword(request: Request, response: Response) {
    const { new_password, new_password_confirmation, token }: ResetUserRequest =
      request.body;

    if (!new_password || !new_password_confirmation) {
      return response.status(400).json({ error: 'Senha é obrigatória!' });
    }

    if (!(new_password === new_password_confirmation)) {
      return response
        .status(400)
        .json({ error: 'As senhas devem ser iguais!' });
    }

    if (!token) {
      return response.status(401).json({ error: 'Token é obrigatório!' });
    }

    const validToken = jwt.verify(token, secretKey) as JwtPayload;

    if (!validToken) {
      return response
        .status(401)
        .json({ error: 'Essa ação não foi autorizada!' });
    }

    const passwordHash = Hash.passwordToHash(new_password);

    await UserRepository.changePassword(
      { newPassword: passwordHash },
      validToken.id,
    );

    response.status(200).json({ msg: 'Senha alterada com sucesso!' });
  }
}

export default new UserController();
