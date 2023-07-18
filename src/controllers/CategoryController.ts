import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';
import IController from '../interfaces/Controller';

class CategoryController implements IController {
  async index(request: Request, response: Response) {
    const user = request.user;

    const categories = await CategoriesRepository.findAll(user.id);
    response.status(200).json(categories);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user = request.user;

    const category = await CategoriesRepository.findById(id, user.id);

    if (!category) {
      return response.status(404).json({ error: 'category not found' });
    }

    response.status(201).json(category);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;
    const user = request.user;

    if (!name) {
      return response.status(400).json({ error: 'name is required!' });
    }

    const category = await CategoriesRepository.create({ name }, user.id);
    response.status(201).json(category);
  }

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const { id } = request.params;
    const user = request.user;

    if (!name) {
      return response.status(400).json({ error: 'name is required!' });
    }

    const category = await CategoriesRepository.update({ name }, id, user.id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found.' });
    }

    response.status(201).json(category);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user = request.user;

    await CategoriesRepository.delete(id, user.id);

    response.sendStatus(204);
  }
}

export default new CategoryController();
