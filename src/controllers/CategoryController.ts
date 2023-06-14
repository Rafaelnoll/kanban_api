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
      return response.status(400).json({ error: 'Name is required!' });
    }

    const category = await CategoriesRepository.create(name);
    response.status(201).json(category);
  }
}

export default new CategoryController();
