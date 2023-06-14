import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  async index(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;

    const category = await CategoriesRepository.create(name);
    response.json(category);
  }
}

export default new CategoryController();
