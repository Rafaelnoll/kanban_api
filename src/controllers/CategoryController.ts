import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  async index(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();
    response.status(200).json(categories);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required!' });
    }

    const category = await CategoriesRepository.create({ name });
    response.status(201).json(category);
  }

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const { id } = request.params;

    if (!name) {
      return response.status(400).json({ error: 'name is required!' });
    }

    const category = await CategoriesRepository.update({ name }, id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found.' });
    }

    response.status(201).json(category);
  }
}

export default new CategoryController();
